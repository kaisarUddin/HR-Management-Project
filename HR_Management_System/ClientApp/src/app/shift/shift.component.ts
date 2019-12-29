import { Component, Inject, wtfStartTimeRange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-shift',
    templateUrl: './shift.component.html'
})
export class ShiftComponent {
    public ShiftList: Shift[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Shift: Shift;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl + 'api/ShiftApi';
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }
    public LoadList() {
        this.Http.get<Shift[]>(this.BaseUrl ).subscribe(result => {
            this.ShiftList = result;
        }, error =>  this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.Shift = new Shift();
    }

    public SubmitShift(form: NgForm) : void {

        if (this.Shift.shiftId == 0) {
            this.Http.post<Shift>(this.BaseUrl, this.Shift)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#shiftModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Shift>(this.BaseUrl + '/' + this.Shift.shiftId, this.Shift)
                .subscribe(result => {
                    let id = this.Shift.shiftId;
                    this.LoadList();
                    form.reset();
                    $('#shiftModal').modal('hide');
                    this.Toastr.successToastr(`${id} updated successfully`);
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
    }
    public GetShift(id: number) {

        this.Http.get<Shift>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Shift = result;
                $('#shiftModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(s: Shift) {

        this.Shift = s;
        $('#deleteModal').modal('show');

    }
    public DeleteShift(id: number) {
        this.Http.delete<Shift>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Shift = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(`${id} deleted successfully`);
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}





class Shift {
    shiftId: number;
    shiftName: string;
    startTime: number;
    endTime: number;


    constructor() {
        this.shiftId = undefined;
        this.shiftName = '';
        this.startTime = 0;
        this.endTime = 0;
    }
}
