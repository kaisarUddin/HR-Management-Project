import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-enlistment',
    templateUrl: './enlistment.component.html'
})
export class EnlistmentComponent {
    public EnlistmentList: Enlistment[];
    
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Enlistment: Enlistment;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl ;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Enlistment[]>(this.BaseUrl + 'api/EnlistmentApi').subscribe(result => {
            this.EnlistmentList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
       
    }

   
    public Cancel() {

        this.Enlistment = new Enlistment();
    }

    public SubmitEnlistment(form: NgForm) {

        if (this.Enlistment.enlistmentId == 0) {
            this.Http.post<Enlistment>(this.BaseUrl + 'api/EnlistmentApi', this.Enlistment)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#enlistmentModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error"));
        }
        else {
            this.Http.put<Enlistment>(this.BaseUrl + 'api/EnlistmentApi/' + this.Enlistment.enlistmentId, this.Enlistment)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#enlistmentModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error"));
        }

    }




    public GetEnlistment(id: number) {

        this.Http.get<Enlistment>(this.BaseUrl + 'api/EnlistmentApi/' + id)
            .subscribe(result => {
                this.Enlistment = result;
                $('#enlistmentModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));

    }

    public DeleteConfirmation(e: Enlistment) {

        this.Enlistment = e;
        $('#deleteModal').modal('show');

    }
    public DeleteEnlistment(id: number) {

        this.Http.delete<Enlistment>(this.BaseUrl + 'api/EnlistmentApi/' + id)
            .subscribe(result => {
                this.Enlistment = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Enlistment {
    enlistmentId: number;
    joinDate: Date;
    endDate: Date;
   

    constructor() {
        this.enlistmentId = 0;
       
    }
}

