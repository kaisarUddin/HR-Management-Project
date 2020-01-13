import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-remarks',
    templateUrl: './remarks.component.html'
})

export class RemarksComponent {

    public RemarksList: Remarks[];
    public ManagerList: Manager[];
    public EmployeeList: Employee[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Remarks: Remarks;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }

    public LoadList() {

        this.Http.get<Remarks[]>(this.BaseUrl + 'api/RemarksApi')
            .subscribe(result => {
                this.RemarksList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
        this.LoadEmployeeList();
        this.LoadManagerList();
    }
    public LoadManagerList() {

        this.Http.get<Manager[]>(this.BaseUrl + 'api/ManagersApi')
            .subscribe(result => {
                this.ManagerList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/EmployeesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }


    public Cancel() {

        this.Remarks = new Remarks();
    }

    public SubmitRemarks(form: NgForm): void {

        if (this.Remarks.remarkId == 0) {
            this.Http.post<Remarks>(this.BaseUrl + 'api/RemarksApi', this.Remarks)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#remarksModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Remarks>(this.BaseUrl + 'api/RemarksApi/' + this.Remarks.remarkId, this.Remarks)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#remarksModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
    }

    public GetRemarks(id: number) {

        this.Http.get<Remarks>(this.BaseUrl + 'api/RemarksApi/' + id)
            .subscribe(result => {
                this.Remarks = result;
                $('#remarksModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(r: Remarks) {

        this.Remarks = r;
        $('#deleteModal').modal('show');

    }
    public DeleteLeave(id: number) {
        this.Http.delete<Remarks>(this.BaseUrl + 'api/RemarksApi/' + id)
            .subscribe(result => {
                this.Remarks = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Remarks {

    constructor() {

        this.remarkId = 0;

    }
    public remarkId: number;
    public comments: string;
    public employeeId: number;
    public fullName: string;
    public managerId: number;
    public managerName: string;

    public employeeError: string;
}

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    fullName: string;

}
interface Manager {
    managerId: number;
    managerName: string;

}
