import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-leave',
    templateUrl: './leave.component.html'
})

export class LeaveComponent {

    public LeaveList: Leave[];
    public EmployeeList: Employee[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Leave: Leave;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }

    public LoadList() {

        this.Http.get<Leave[]>(this.BaseUrl + 'api/LeavesApi')
            .subscribe(result => {
                this.LeaveList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
        this.LoadEmployeeList();
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/LeavesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }


    public Cancel() {

        this.Leave = new Leave();
    }

    public SubmitLeave(form: NgForm): void {

        if (this.Leave.leaveId == 0) {
            this.Http.post<Leave>(this.BaseUrl + 'api/LeavesApi', this.Leave)
                .subscribe(result => {
                  
                    this.LoadList();
                    form.reset();
                    $('#leaveModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Leave>(this.BaseUrl + 'api/LeavesApi/' + this.Leave.leaveId, this.Leave)
                .subscribe(result => {
                 
                    this.LoadList();
                    form.reset();
                    $('#leaveModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
    }

    public GetLeave(id: number) {

        this.Http.get<Leave>(this.BaseUrl + 'api/LeavesApi/' + id)
            .subscribe(result => {
                this.Leave = result;
                $('#leaveModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(l: Leave) {

        this.Leave = l;
        $('#deleteModal').modal('show');

    }
    public DeleteLeave(id: number) {
        this.Http.delete<Leave>(this.BaseUrl + 'api/LeavesApi/' + id)
            .subscribe(result => {
                this.Leave = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Leave {

    constructor() {

        this.leaveId = 0;
       
    }
    public leaveId: number;
    public leaveCategory: string;
    public startDate: Date;
    public endDate: Date;
    public totalLeave: number;
    public approvalStatus: string;
    public employeeId: number;
    public employeeError: string;
}

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    fullName: string;

}
