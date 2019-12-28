import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
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
    public Leave: Leave;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        this.Http = http;
        this.BaseUrl = baseUrl;



        this.LoadList();

    }

    public LoadList() {

        this.Http.get<Leave[]>(this.BaseUrl + 'api/LeavesApi')
            .subscribe(result => {
                this.LeaveList = result;
            }, error => console.error(error));
        this.Cancel();
        this.LoadEmployeeList();
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/LeavesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => console.error(error));
        this.Cancel();
    }


    public Cancel() {

        this.Leave = new Leave();
    }

    public SubmitLeave(): void {


        if (!this.ValidateLeave()) return;


        if (this.Leave.leaveId == 0) {
            this.Http.post<Leave>(this.BaseUrl + 'api/LeavesApi', this.Leave)
                .subscribe(result => {
                   // alert(result.fullName + ' create successfully');
                    this.LoadList();
                    $('#leaveModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<Leave>(this.BaseUrl + 'api/LeavesApi/' + this.Leave.leaveId, this.Leave)
                .subscribe(result => {
                   // alert(result.fullName + ' updated successfully');
                    this.LoadList();
                    $('#leaveModal').modal('hide');
                }, error => console.error(error));
        }





    }


    public ValidateLeave(): boolean {
        if (this.Leave.employeeId == 0 || isNullOrUndefined(this.Leave.employeeId)) {

            this.Leave.employeeError = "Employee is not selected";
            return false;
        }
        else {
            this.Leave.employeeError = null;
        }

        //if (isNullOrUndefined(this.Leave.gender)) {

        //    this.Leave.countryError = "Person gender is not selected";
        //    return false;
        //}

        //return true;
    }



    public GetLeave(id: number) {

        this.Http.get<Leave>(this.BaseUrl + 'api/LeavesApi/' + id)
            .subscribe(result => {
                this.Leave = result;
                $('#leaveModal').modal('show');
            }, error => console.error(error));

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
            }, error => console.error(error));

    }
}

class Leave {

    constructor() {

        this.leaveId = 0;
        //this.firstName = '';
        //this.lastName = '';
        //this.fullName = '';
        //this.gender = 'Male';
        //this.address = '';

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
