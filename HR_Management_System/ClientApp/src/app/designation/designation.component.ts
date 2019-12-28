import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Component({
    selector: 'app-designation',
    templateUrl: './designation.component.html'
})
export class DesignationComponent {
    public DesignationList: Designation[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Designation: Designation;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.Http = http;
      this.BaseUrl = baseUrl + 'api/DesignationApi';
      this.LoadList();
    }
    public LoadList() {
        this.Http.get<Designation[]>(this.BaseUrl ).subscribe(result => {
            this.DesignationList = result;
        }, error => console.error(error));
        this.Cancel();
    }
    public Cancel() {

        this.Designation = new Designation();
    }

    public SubmitDesignation() {

        if (this.Designation.desigId == 0) {
            this.Http.post<Designation>(this.BaseUrl, this.Designation)
                .subscribe(result => {
                   
                    this.LoadList();
                    $('#designationModal').modal('hide');
                }, error => console.error(error));
        }
        else {
            this.Http.put<Designation>(this.BaseUrl + '/' + this.Designation.desigId, this.Designation)
                .subscribe(result => {
                   
                    this.LoadList();
                    $('#designationModal').modal('hide');
                }, error => console.error(error));
        }





    }




    public GetDesignation(id: number) {

        this.Http.get<Designation>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Designation = result;
                $('#designationModal').modal('show');
            }, error => console.error(error));

    }

    public DeleteConfirmation(d: Designation) {

        this.Designation = d;
        $('#deleteModal').modal('show');

    }
    public DeleteDesignation(id: number) {





        this.Http.delete<Designation>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Designation = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => console.error(error));

    }
}





class Designation {
    desigId: number;
    designationName: string;


    constructor() {
        this.desigId = 0;
        this.designationName = '';
    }
}
