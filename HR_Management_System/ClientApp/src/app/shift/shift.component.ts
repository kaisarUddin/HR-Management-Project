import { Component, Inject, wtfStartTimeRange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Component({
    selector: 'app-shift',
    templateUrl: './shift.component.html'
})
export class ShiftComponent {
    public ShiftList: Shift[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Shift: Shift;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.Http = http;
      this.BaseUrl = baseUrl + 'api/ShiftApi';
      this.LoadList();
    }
    public LoadList() {
        this.Http.get<Shift[]>(this.BaseUrl ).subscribe(result => {
            this.ShiftList = result;
        }, error => console.error(error));
        this.Cancel();
    }
    public Cancel() {

        this.Shift = new Shift();
    }

    public SubmitShift() {

        if (this.Shift.shiftId == 0) {
            this.Http.post<Shift>(this.BaseUrl, this.Shift)
                .subscribe(result => {
                   
                    this.LoadList();
                    $('#shiftModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<Shift>(this.BaseUrl + '/' + this.Shift.shiftId, this.Shift)
                .subscribe(result => {
                   
                    this.LoadList();
                    $('#shiftModal').modal('hide');
                }, error => console.error(error));
        }





    }




    public GetShift(id: number) {

        this.Http.get<Shift>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Shift = result;
                $('#shiftModal').modal('show');
            }, error => console.error(error));

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
            }, error => console.error(error));

    }
}





class Shift {
    shiftId: number;
    shiftName: string;
    startTime: number;
    endTime: number;


    constructor() {
        this.shiftId = 0;
        this.shiftName = '';
        this.startTime = 0;
        this.endTime = 0;
    }
}
