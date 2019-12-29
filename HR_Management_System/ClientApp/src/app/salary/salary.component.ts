import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-salary',
    templateUrl: './salary.component.html'
})

export class SalaryComponent {

    public SalaryList: Salary[];
    public EmployeeList: Employee[];
    public PayrollPolicyList: PayrollPolicy[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Salary: Salary;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;


        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }

    public LoadList() {

        this.Http.get<Salary[]>(this.BaseUrl + 'api/SalaryApi')
            .subscribe(result => {
                this.SalaryList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
        this.LoadEmployeeList();
        this.LoadPayrollPolicyList();
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/EmployeesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public LoadPayrollPolicyList() {

        this.Http.get<PayrollPolicy[]>(this.BaseUrl + 'api/PayrollPolicyApi')
            .subscribe(result => {
                this.PayrollPolicyList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }



    public Cancel() {

        this.Salary = new Salary();
    }

    public SubmitSalary(form: NgForm): void {
        if (this.Salary.salaryId == 0) {
            this.Http.post<Salary>(this.BaseUrl + 'api/SalaryApi', this.Salary)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#salaryModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Salary>(this.BaseUrl + 'api/LeavesApi/' + this.Salary.salaryId, this.Salary)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#salaryModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
    }


    public GetSalary(id: number) {

        this.Http.get<Salary>(this.BaseUrl + 'api/SalaryApi/' + id)
            .subscribe(result => {
                this.Salary = result;
                $('#salaryModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(s: Salary) {

        this.Salary = s;
        $('#deleteModal').modal('show');

    }
    public DeleteSalary(id: number) {





        this.Http.delete<Salary>(this.BaseUrl + 'api/SalaryApi/' + id)
            .subscribe(result => {
                this.Salary = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Salary {

    constructor() {

        this.salaryId = 0;
       

    }



    public salaryId: number;
    public employeeId: number;
    public policyId: number;
    public basic: number;
    public salaryType: string;
    public transportAllowance: number;
    public houseRent: number;
    public medicalAllowance: number;
    public foodAllowance: number;
    public festivalBonus: number;
    public providentFund: number;
    public GrossSalary: number;
    public employeeError: string;
    public payrollPolicyError: string;
}

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    fullName: string;

}
interface PayrollPolicy {
    policyId: number;
    tA: number;
    hR: number;
    mA: number;
    fA: number;
    fB: number;
    pF: number;
   

}
