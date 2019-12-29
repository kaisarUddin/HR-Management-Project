import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-payrollPolicy',
    templateUrl: './payrollPolicy.component.html'
})
export class PayrollPolicyComponent {
    public PayrollPolicyList: PayrollPolicy[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public PayrollPolicy: PayrollPolicy;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl + 'api/PayrollPolicyApi';
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }
    public LoadList() {
        this.Http.get<PayrollPolicy[]>(this.BaseUrl ).subscribe(result => {
            this.PayrollPolicyList = result;
        }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.PayrollPolicy = new PayrollPolicy();
    }

    public SubmitPayrollPolicy(form: NgForm) {

        if (this.PayrollPolicy.policyId == 0) {
            this.Http.post<PayrollPolicy>(this.BaseUrl, this.PayrollPolicy)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#payrollPolicyModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<PayrollPolicy>(this.BaseUrl + '/' + this.PayrollPolicy.policyId, this.PayrollPolicy)
                .subscribe(result => {
                   
                    this.LoadList();
                    form.reset();
                    $('#payrollPolicyModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }

    }

    public GetPayrollPolicy(id: number) {

        this.Http.get<PayrollPolicy>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.PayrollPolicy = result;
                $('#payrollPolicyModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(p: PayrollPolicy) {

        this.PayrollPolicy = p;
        $('#deleteModal').modal('show');

    }
    public DeletePayrollPolicy(id: number) {
        this.Http.delete<PayrollPolicy>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.PayrollPolicy = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                    this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}
class PayrollPolicy {
    policyId: number;
    tA: number;
    hR: number;
    mA: number;
    fA: number;
    fB: number;
    pF: number;


    constructor() {
        this.policyId = 0;
        this.tA = 0;
        this.hR = 0;
        this.mA = 0;
        this.fA = 0;
        this.fB = 0;
        this.pF = 0;
        
    }
}
