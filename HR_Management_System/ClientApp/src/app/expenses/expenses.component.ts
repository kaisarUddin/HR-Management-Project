import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html'
})
export class ExpensesComponent {
    public ExpensesList: Expenses[];
    public DepartmentList: Department[];

    public Http: HttpClient;
    public Toastr: ToastrManager;
    public BaseUrl: string;
    public Expenses: Expenses;
    public photoPreview: string | ArrayBuffer;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
        this.Http = http;
        this.BaseUrl = baseUrl ;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {

        this.Http.get<Expenses[]>(this.BaseUrl + 'api/ExpensesApi')
          .subscribe(result => {
            this.ExpensesList = result;
        }, error => this.Toastr.errorToastr(error, "error LoadList"));
        this.Cancel();
        this.LoadDepartmentList();

    }
    public LoadDepartmentList() {

        this.Http.get<Department[]>(this.BaseUrl + 'api/DepartmentApi')
            .subscribe(result => {
                this.DepartmentList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadDepartmentList"));

    }


    onFileChanged(event) {
        this.Expenses.upload = event.target.files[0];
        this.preview();
    }
    preview() {
        // Show preview 
        var mimeType = this.Expenses.upload.type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.Expenses.upload);
        reader.onload = (_event) => {
            this.photoPreview = reader.result;
        }
    }
    public Cancel() {

        this.Expenses = new Expenses();
        this.photoPreview = null;
    }

    public SubmitExpenses(form: NgForm) {

        const formData = new FormData();

        formData.append('expensesId', this.Expenses.expensesId.toString());
        formData.append('title', this.Expenses.title);
        formData.append('purchaseDate', this.Expenses.purchaseDate.toString());

        formData.append('deptId', this.Expenses.deptId.toString());
        formData.append('departmentName', this.Expenses.departmentName);

        formData.append('purchaseBy', this.Expenses.purchaseBy);
        formData.append('bill', this.Expenses.bill);
        formData.append('upload', this.Expenses.upload, this.Expenses.upload.name);


        if (this.Expenses.expensesId == 0) {
            this.Http.post<Expenses>(this.BaseUrl + 'api/ExpensesApi', formData)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#expensesModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error SubmitExpenses post"));
        }
        else {
            this.Http.put<Expenses>(this.BaseUrl + 'api/ExpensesApi/' + this.Expenses.expensesId, formData)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#expensesModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error SubmitExpenses put"));
        }
    }




    public GetExpenses(id: number) {

        this.Http.get<Expenses>(this.BaseUrl + 'api/ExpensesApi/' + id)
            .subscribe(result => {
                this.Expenses = result;
                $('#expensesModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error GetExpenses"));

    }

    public DeleteConfirmation(e: Expenses) {

        this.Expenses = e;
        $('#deleteModal').modal('show');

    }
    public DeleteExpenses(id: number) {





        this.Http.delete<Expenses>(this.BaseUrl + 'api/ExpensesApi/' + id)
            .subscribe(result => {
                this.Expenses = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Expenses {
    public expensesId: number;
    public title: string;
    public purchaseDate: Date;
    public purchaseBy: string;
    public deptId: number;
    public departmentName: string;
    public managerId: number;
    public companyId: number;


    public bill: string;
    public upload: File;


    constructor() {
        this.expensesId = 0;

    }
}

interface Department {
  deptId: number;
    departmentName: string;
    managerId: number;
    companyId: number;

}


