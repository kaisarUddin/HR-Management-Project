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
    public LeaveList: Leave[];
    public PayrollPolicyList: PayrollPolicy[];
    public PayrollPolicy: PayrollPolicy;
    public Leave: Leave;



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
            },
                error => this.Toastr.errorToastr(error, "Error LoadList"));
        this.Cancel();
        this.LoadEmployeeList();
        this.LoadLeaveList();
        this.LoadPayrollPolicyList();
       
    }

    changePolicy() {
        if (isNullOrUndefined(this.Salary.policyId)) return;
        this.Http.get<PayrollPolicy>(this.BaseUrl + 'api/PayrollPolicyApi/' + this.Salary.policyId)
            .subscribe(result => {
                this.PayrollPolicy = result;
                this.basicChange();
            }, error => this.Toastr.errorToastr(error, "Error changePolicy"));

    }
    changeLeave() {
      if (isNullOrUndefined(this.Salary.leaveId)) return;
      this.Http.get<Leave>(this.BaseUrl + 'api/LeavesApi/' + this.Salary.leaveId)
        .subscribe(result => {
          this.Leave = result;
          this.basicChange();
        }, error => this.Toastr.errorToastr(error, "Error changeLeave"));

    }

    basicChange() {
        if (isNullOrUndefined(this.Salary.basic) || isNullOrUndefined(this.PayrollPolicy)) return;
        this.Salary.transportAllowance = this.Salary.basic * this.PayrollPolicy.tA / 100;
        this.Salary.houseRent = this.Salary.basic * this.PayrollPolicy.hR / 100;
        this.Salary.medicalAllowance = this.Salary.basic * this.PayrollPolicy.mA / 100;
        this.Salary.festivalBonus = this.Salary.basic * this.PayrollPolicy.fB / 100;
        this.Salary.oTRate = this.Salary.overTime * 500;
        this.Salary.foodAllowance = this.Salary.basic * this.PayrollPolicy.fA / 100;
        this.Salary.providentFund = this.Salary.basic * this.PayrollPolicy.pF / 100;
        this.Salary.leaveFine = this.Leave.totalLeave * 1000;

        this.Salary.grossSalary = this.Salary.basic +
            this.Salary.transportAllowance +
            this.Salary.houseRent +
            this.Salary.medicalAllowance +
            this.Salary.festivalBonus +
            this.Salary.oTRate +
            this.Salary.foodAllowance -
            this.Salary.providentFund -
            this.Salary.leaveFine ;
          ;
    }

    public LoadEmployeeList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/EmployeesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadEmployeeList"));
        this.Cancel();
    }
    public LoadLeaveList() {

      this.Http.get<Leave[]>(this.BaseUrl + 'api/LeavesApi')
        .subscribe(result => {
          this.LeaveList = result;
        }, error => this.Toastr.errorToastr(error, "Error LoadLeaveList"));
      this.Cancel();
    }
    public LoadPayrollPolicyList() {

        this.Http.get<PayrollPolicy[]>(this.BaseUrl + 'api/PayrollPolicyApi')
            .subscribe(result => {
                this.PayrollPolicyList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadPayrollPolicyList"));
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
            this.Http.put<Salary>(this.BaseUrl + 'api/SalaryApi/' + this.Salary.salaryId, this.Salary)
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

    public salaryId: number = 0;
    public employeeId: number;
    public employeeName: number;
    public leaveId: number;
    public totalLeave: number;
    public policyId: number;
    public policyType: string;
    public basic: number;
    public salaryType: string;
    public transportAllowance: number;
    public houseRent: number;
    public medicalAllowance: number;
    public foodAllowance: number;
    public festivalBonus: number;
    public overTime: number;
    public oTRate: number;
    public leaveFine: number;
    public providentFund: number;
    public grossSalary: number;
    public employeeError: string;
    public payrollPolicyError: string;
}

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    fullName: string;

}
class Leave {
  public  leaveId: number;
  public  totalLeave: number;

}
class PayrollPolicy {
    public policyId: number;
    public policyType: string;
    public tA: number;
    public hR: number;
    public mA: number;
    public fA: number;
    public fB: number;
    public pF: number;


}
