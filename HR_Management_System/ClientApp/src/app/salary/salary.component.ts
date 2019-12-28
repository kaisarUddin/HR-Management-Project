import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
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
    public Salary: Salary;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

        this.Http = http;
        this.BaseUrl = baseUrl;



        this.LoadList();

    }

    public LoadList() {

        this.Http.get<Salary[]>(this.BaseUrl + 'api/SalaryApi')
            .subscribe(result => {
                this.SalaryList = result;
            }, error => console.error(error));
        this.Cancel();
        this.LoadEmployeeList();
        this.LoadPayrollPolicyList();
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/SalaryApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => console.error(error));
        this.Cancel();
    }
    public LoadPayrollPolicyList() {

        this.Http.get<PayrollPolicy[]>(this.BaseUrl + 'api/SalaryApi')
            .subscribe(result => {
                this.PayrollPolicyList = result;
            }, error => console.error(error));
        this.Cancel();
    }



    public Cancel() {

        this.Salary = new Salary();
    }

    public SubmitSalary(): void {


        if (!this.ValidateSalary()) return;
        if (!this.ValidateSalaryPolicy()) return;


        if (this.Salary.salaryId == 0) {
            this.Http.post<Salary>(this.BaseUrl + 'api/SalaryApi', this.Salary)
                .subscribe(result => {
                   // alert(result.fullName + ' create successfully');
                    this.LoadList();
                    $('#salaryModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<Salary>(this.BaseUrl + 'api/LeavesApi/' + this.Salary.salaryId, this.Salary)
                .subscribe(result => {
                   // alert(result.fullName + ' updated successfully');
                    this.LoadList();
                    $('#salaryModal').modal('hide');
                }, error => console.error(error));
        }





    }


    public ValidateSalary(): boolean {
        if (this.Salary.employeeId == 0 || isNullOrUndefined(this.Salary.employeeId)) {

            this.Salary.employeeError = "Employee is not selected";
            return false;
        }
        else {
            this.Salary.employeeError = null;
        }

        //if (isNullOrUndefined(this.Leave.gender)) {

        //    this.Leave.countryError = "Person gender is not selected";
        //    return false;
        //}

        //return true;
    }
    public ValidateSalaryPolicy(): boolean {
        if (this.Salary.policyId == 0 || isNullOrUndefined(this.Salary.policyId)) {

            this.Salary.payrollPolicyError = "PayrollPolicy is not selected";
            return false;
        }
        else {
            this.Salary.payrollPolicyError = null;
        }

       
    }



    public GetSalary(id: number) {

        this.Http.get<Salary>(this.BaseUrl + 'api/SalaryApi/' + id)
            .subscribe(result => {
                this.Salary = result;
                $('#salaryModal').modal('show');
            }, error => console.error(error));

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
            }, error => console.error(error));

    }
}

class Salary {

    constructor() {

        this.salaryId = 0;
        //this.firstName = '';
        //this.lastName = '';
        //this.fullName = '';
        //this.gender = 'Male';
        //this.address = '';

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
