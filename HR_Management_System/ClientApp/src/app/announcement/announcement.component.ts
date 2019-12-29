import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-announcement',
    templateUrl: './announcement.component.html'
})
export class AnnouncementComponent {
    public AnnouncementList: Announcement[];
    public DepartmentList: Department[];
    public Http: HttpClient;
    public BaseUrl: string; 
    public Toastr: ToastrManager;
    public Announcement: Announcement;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr:ToastrManager) {
      this.Http = http;
      this.BaseUrl = baseUrl;
      this.Toastr = toastr;
      this.LoadList();
      this.Toastr.successToastr("Data loaded successfully");
  }
    public LoadList() {
        this.Http.get<Announcement[]>(this.BaseUrl ).subscribe(result => {
            this.AnnouncementList = result;
        }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
        this.LoadDepartmentList();
    }
    public LoadDepartmentList() {

        this.Http.get<[Department]>(this.BaseUrl + 'api /DepartmentApi')
            .subscribe(result => {
                this.DepartmentList = result;
            }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.Announcement = new Announcement();
    }

    public SubmitAnnouncement(form: NgForm): void {

        if (this.Announcement.announcementId == 0) {
            this.Http.post<Announcement>(this.BaseUrl + 'api /AnnouncementApi', this.Announcement)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#announcementModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Announcement>(this.BaseUrl + 'api /AnnouncementApi'+ this.Announcement.announcementId, this.Announcement)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#announcementModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        }

    }
    public GetAnnouncement(id: number) {

        this.Http.get<Announcement>(this.BaseUrl + 'api /AnnouncementApi' + id)
            .subscribe(result => {
                this.Announcement = result;
                $('#announcementModal').modal('show');
            }, error =>  error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(a: Announcement) {

        this.Announcement = a;
        $('#deleteModal').modal('show');

    }
    public DeleteAnnouncement(id: number) {

        this.Http.delete<Announcement>(this.BaseUrl + 'api /AnnouncementApi' + id)
            .subscribe(result => {
                this.Announcement = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error =>  error => this.Toastr.errorToastr(error, "Error"));

    }
}





class Announcement {
    announcementId: number;
    title: string;
    postedDate: Date;
    description: string;
    departmentId: number;
    departmenError: string;


    constructor() {
        this.announcementId = 0;
       
    }
}
interface Department {
    departmentId: number;
    departmentName: string;
}
