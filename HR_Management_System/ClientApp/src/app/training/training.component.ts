import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-training',
    templateUrl: './training.component.html'
})
export class TrainingComponent {
    public TrainingList: Training[];
    public EmployeeList: Employee[];
    public DepartmentList: Department[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Training: Training;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl ;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Training[]>(this.BaseUrl + 'api/TrainingApi').subscribe(result => {
            this.TrainingList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
        this.LoadEmployeeList();
        this.LoadDepartmentList();
    }

    public LoadEmployeeList() {

      this.Http.get<Employee[]>(this.BaseUrl + 'api/EmployeesApi')
        .subscribe(result => {
          this.EmployeeList = result;
        }, error => this.Toastr.errorToastr(error, "Error"));
      this.Cancel();
    }
    public LoadDepartmentList() {

      this.Http.get<Department[]>(this.BaseUrl + 'api/DepartmentApi')
        .subscribe(result => {
            this.DepartmentList = result;
        }, error => this.Toastr.errorToastr(error, "Error LoadDepartmentList"));
      this.Cancel();
    }
    public Cancel() {

        this.Training = new Training();
    }

    public SubmitTraining(form: NgForm) {

        if (this.Training.trainingId == 0) {
            this.Http.post<Training>(this.BaseUrl + 'api/TrainingApi', this.Training)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#trainingModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error"));
        }
        else {
            this.Http.put<Training>(this.BaseUrl + 'api/TrainingApi/' + this.Training.trainingId, this.Training)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#trainingModal').modal('hide');
                    this.Toastr.successToastr(' Data updated successfully', "Success");
                }, error => this.Toastr.errorToastr(error, "error"));
        }

    }




    public GetTraining(id: number) {

        this.Http.get<Training>(this.BaseUrl + 'api/TrainingApi/' + id)
            .subscribe(result => {
                this.Training = result;
                $('#trainingModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));

    }

    public DeleteConfirmation(t: Training) {

        this.Training = t;
        $('#deleteModal').modal('show');

    }
    public DeleteTraining(id: number) {

        this.Http.delete<Training>(this.BaseUrl + 'api/TrainingApi/' + id)
            .subscribe(result => {
                this.Training = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr(' Data deleted successfully', "Success");
            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Training {
    trainingId: number;
    trainingTitle: string;
    startDate: Date;
    endDate: Date;
    public employeeId: number;
   public firstName: string;
   public lastName: string;
   public fullName: string;
    public employeeError: string;
   public deptId: number;
   public departmentName: string;
   public managerId: number;
   public companyId: number;

    constructor() {
        this.trainingId = 0;
       
    }
}
interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  fullName: string;

}
interface Department {
  deptId: number;
  departmentName: string;
  managerId: number;
  companyId: number;

}
