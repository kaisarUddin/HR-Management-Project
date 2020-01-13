import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';
declare var $: any;


@Component({
    selector: 'app-holiday',
    templateUrl: './holiday.component.html'
})
export class HolidayComponent {
    public HolidayList: Holiday[];
    public DepartmentList: Department[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Holiday: Holiday;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl ;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr('Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Holiday[]>(this.BaseUrl + 'api/HolidayApi').subscribe(result => {
            this.HolidayList = result;
        }, error => this.Toastr.errorToastr(error, "error LoadList"));
        this.Cancel();
        this.LoadDepartmentList();
    }
    public LoadDepartmentList() {

      this.Http.get<Department[]>(this.BaseUrl + 'api/DepartmentApi')
        .subscribe(result => {
          this.DepartmentList = result;
        }, error => this.Toastr.errorToastr(error, "Error LoadDepartmentList"));
      this.Cancel();
    }
    public Cancel() {

        this.Holiday = new Holiday();
    }

    public SubmitHoliday(form: NgForm) {

        if (this.Holiday.holidayId == 0) {
            this.Http.post<Holiday>(this.BaseUrl + 'api/HolidayApi', this.Holiday)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#holidayModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error"));
        }
        else {
            this.Http.put<Holiday>(this.BaseUrl + 'api/HolidayApi/' + this.Holiday.holidayId, this.Holiday)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#holidayModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error"));
        }

    }




    public GetHoliday(id: number) {

        this.Http.get<Holiday>(this.BaseUrl + 'api/HolidayApi/' + id)
            .subscribe(result => {
                this.Holiday = result;
                $('#holidayModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));

    }

    public DeleteConfirmation(h: Holiday) {

        this.Holiday = h;
        $('#deleteModal').modal('show');

    }
    public DeleteHoliday(id: number) {





        this.Http.delete<Holiday>(this.BaseUrl + 'api/HolidayApi/' + id)
            .subscribe(result => {
                this.Holiday = result;
                this.LoadList();
                $('#deleteModal').modal('hide');


            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Holiday {
    holidayId: number;
    name: string;
    date: Data;
    description: string;
    deptId: number;
    departmentName: string;
    managerId: number;
    companyId: number;

    constructor() {
        this.holidayId = 0;
       
    }
}
interface Department {
  deptId: number;
  departmentName: string;
  managerId: number;
  companyId: number;

}
