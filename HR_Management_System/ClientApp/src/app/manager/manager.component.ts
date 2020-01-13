import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html'
})
export class ManagerComponent {
    public ManagerList: Manager[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Manager: Manager;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr:ToastrManager) {
      this.Http = http;
      this.BaseUrl = baseUrl + 'api/ManagersApi';
      this.Toastr = toastr;
      this.LoadList();
      this.Toastr.successToastr("Data loaded successfully");
  }
    public LoadList() {
        this.Http.get<Manager[]>(this.BaseUrl ).subscribe(result => {
            this.ManagerList = result;
        }, error => error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.Manager = new Manager();
    }

    public SubmitManager(form: NgForm) {

        if (this.Manager.managerId == 0) {
            this.Http.post<Manager>(this.BaseUrl, this.Manager)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#managerModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put(this.BaseUrl + '/' + this.Manager.managerId, this.Manager)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#managerModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => error => this.Toastr.errorToastr(error, "Error"));
        }
    }

    public GetManager(id: number) {

        this.Http.get<Manager>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Manager = result;
                $('#managerModal').modal('show');
            }, error => error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(m: Manager) {

        this.Manager = m;
        $('#deleteModal').modal('show');

    }
    public DeleteManager(id: number) {
        this.Http.delete<Manager>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Manager = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
            }, error => error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Manager {
    managerId: number;
    managerName: string;


    constructor() {
        this.managerId = 0;
        this.managerName = '';
    }
}
