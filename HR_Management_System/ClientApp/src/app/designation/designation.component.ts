import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-designation',
    templateUrl: './designation.component.html'
})
export class DesignationComponent {
    public DesignationList: Designation[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Designation: Designation;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr:ToastrManager) {
      this.Http = http;
      this.BaseUrl = baseUrl + 'api/DesignationApi';
      this.Toastr = toastr;
      this.LoadList();
      this.Toastr.successToastr("Data loaded successfully");
  }
    public LoadList() {
        this.Http.get<Designation[]>(this.BaseUrl ).subscribe(result => {
            this.DesignationList = result;
        }, error => error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.Designation = new Designation();
    }

    public SubmitDesignation(form: NgForm) {

        if (this.Designation.desigId == 0) {
            this.Http.post<Designation>(this.BaseUrl, this.Designation)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#designationModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Designation>(this.BaseUrl + '/' + this.Designation.desigId, this.Designation)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#designationModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => error => this.Toastr.errorToastr(error, "Error"));
        }
    }

    public GetDesignation(id: number) {

        this.Http.get<Designation>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Designation = result;
                $('#designationModal').modal('show');
            }, error => error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(d: Designation) {

        this.Designation = d;
        $('#deleteModal').modal('show');

    }
    public DeleteDesignation(id: number) {
        this.Http.delete<Designation>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Designation = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Designation {
    desigId: number;
    designationName: string;


    constructor() {
        this.desigId = 0;
        this.designationName = '';
    }
}
