import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Component({
    selector: 'app-payrollPolicy',
    templateUrl: './payrollPolicy.component.html'
})
export class PayrollPolicyComponent {
    public PayrollPolicyList: PayrollPolicy[];
    public Http: HttpClient;
    public BaseUrl: string;
    public PayrollPolicy: PayrollPolicy;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.Http = http;
      this.BaseUrl = baseUrl + 'api/PayrollPolicyApi';
      this.LoadList();
    }
    public LoadList() {
        this.Http.get<PayrollPolicy[]>(this.BaseUrl ).subscribe(result => {
            this.PayrollPolicyList = result;
        }, error => console.error(error));
        this.Cancel();
    }
    public Cancel() {

        this.PayrollPolicy = new PayrollPolicy();
    }

    public SubmitPayrollPolicy() {

        if (this.PayrollPolicy.policyId == 0) {
            this.Http.post<PayrollPolicy>(this.BaseUrl, this.PayrollPolicy)
                .subscribe(result => {
                   
                    this.LoadList();
                    $('#payrollPolicyModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<PayrollPolicy>(this.BaseUrl + '/' + this.PayrollPolicy.policyId, this.PayrollPolicy)
                .subscribe(result => {
                   
                    this.LoadList();
                    $('#payrollPolicyModal').modal('hide');
                }, error => console.error(error));
        }





    }




    public GetPayrollPolicy(id: number) {

        this.Http.get<PayrollPolicy>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.PayrollPolicy = result;
                $('#payrollPolicyModal').modal('show');
            }, error => console.error(error));

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
            }, error => console.error(error));

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
        this.tA = 0;
        this.hR = 0;
        this.mA = 0;
        this.fA = 0;
        this.fB = 0;
        this.pF = 0;
        
    }
}
