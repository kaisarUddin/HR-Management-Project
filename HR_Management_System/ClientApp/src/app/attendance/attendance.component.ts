import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { Time } from '@angular/common';
declare var $: any;
@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html'
})

export class AttendanceComponent {

    public AttendanceList: Attendance[];
    public EmployeeList: Employee[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Attendance: Attendance;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }

    public LoadList() {

        this.Http.get<Attendance[]>(this.BaseUrl + 'api/AttendanceApi')
            .subscribe(result => {
                this.AttendanceList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadList"));
        this.Cancel();
        this.LoadEmployeeList();
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/EmployeesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadEmployeeList "));
        this.Cancel();
    }


    public Cancel() {

        this.Attendance = new Attendance();
    }

    public SubmitAttendance(form: NgForm): void {


        //this.Attendance.punchIn = new Date(`0001-01-01 ${this.Attendance.punchIn}`);
        //this.Attendance.punchOut = new Date(`0001-01-01 ${this.Attendance.punchOut}`);


        if (this.Attendance.attendanceId == 0) {
            this.Http.post<Attendance>(this.BaseUrl + 'api/AttendanceApi', this.Attendance)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#attendanceModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error SubmitAttendance post"));
        }
        else {
            this.Http.put<Attendance>(this.BaseUrl + 'api/AttendanceApi/' + this.Attendance.attendanceId, this.Attendance)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#attendanceModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error SubmitAttendance put"));
        }
    }

    public GetAttendance(id: number) {

        this.Http.get<Attendance>(this.BaseUrl + 'api/AttendanceApi/' + id)
            .subscribe(result => {
                this.Attendance = result;
                $('#attendanceModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error GetAttendance"));

    }

    public DeleteConfirmation(a: Attendance) {

        this.Attendance = a;
        $('#deleteModal').modal('show');

    }
    public DeleteAttendance(id: number) {
        this.Http.delete<Attendance>(this.BaseUrl + 'api/AttendanceApi/' + id)
            .subscribe(result => {
                this.Attendance = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error DeleteAttendance"));

    }
}

class Attendance {

    constructor() {

        this.attendanceId = 0;

    }
    public attendanceId: number;
    public leaveCategory: string;
    public punchIn: Time;
    public punchOut: Time;
    public date: Date;
    public active: boolean;
    public employeeId: number;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public employeeError: string;
}

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    fullName: string;

}
