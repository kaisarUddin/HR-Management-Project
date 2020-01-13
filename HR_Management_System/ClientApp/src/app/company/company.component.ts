import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-company',
    templateUrl: './company.component.html'
})
export class CompanyComponent {
    public CompanyList: Company[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Company: Company;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl + 'api/CompanyApi';
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Company[]>(this.BaseUrl).subscribe(result => {
            this.CompanyList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
    }
    public Cancel() {

        this.Company = new Company();
    }

    public SubmitCompany(form: NgForm) {

        if (this.Company.companyId == 0) {
            this.Http.post<Company>(this.BaseUrl, this.Company)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#companyModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error"));
        }
        else {
            this.Http.put<Company>(this.BaseUrl + '/' + this.Company.companyId, this.Company)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#companyModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error"));
        }

    }




    public GetCompany(id: number) {

        this.Http.get<Company>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Company = result;
                $('#companyModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));

    }

    public DeleteConfirmation(c: Company) {

        this.Company = c;
        $('#deleteModal').modal('show');

    }
    public DeleteCompany(id: number) {





        this.Http.delete<Company>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Company = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Company {
    companyId: number;
    companyName: string;
    companyAddress: string;


    constructor() {
        this.companyId = 0;
       
    }
}
