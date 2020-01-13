import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-department',
    templateUrl: './department.component.html'
})

export class DepartmentComponent {

    public DepartmentList: Department[];
    public ManagerList: Manager[];
    public CompanyList: Company[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Department: Department;


    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }

    public LoadList() {

        this.Http.get<Department[]>(this.BaseUrl + 'api/DepartmentApi')
            .subscribe(result => {
                this.DepartmentList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
        this.LoadManagerList();
        this.LoadCompanyList();
    }

    public LoadManagerList() {

        this.Http.get<Manager[]>(this.BaseUrl + 'api/ManagersApi')
            .subscribe(result => {
                this.ManagerList = result;
            }, error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public LoadCompanyList() {

      this.Http.get<Company[]>(this.BaseUrl + 'api/CompanyApi')
        .subscribe(result => {
          this.CompanyList = result;
        }, error => this.Toastr.errorToastr(error, "Error"));
      this.Cancel();
    }


    public Cancel() {

        this.Department = new Department();
    }

    public SubmitDepartment(form: NgForm): void {

        if (this.Department.deptId == 0) {
            this.Http.post<Department>(this.BaseUrl + 'api/DepartmentApi', this.Department)
                .subscribe(result => {
                  
                    this.LoadList();
                    form.reset();
                    $('#departmentModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Department>(this.BaseUrl + 'api/DepartmentApi/' + this.Department.deptId, this.Department)
                .subscribe(result => {
                 
                    this.LoadList();
                    form.reset();
                    $('#departmentModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error"));
        }
    }

    public GetDepartment(id: number) {

        this.Http.get<Department>(this.BaseUrl + 'api/DepartmentApi/' + id)
            .subscribe(result => {
                this.Department = result;
                $('#departmentModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(d: Department) {

        this.Department = d;
        $('#deleteModal').modal('show');

    }
    public DeleteDepartment(id: number) {
        this.Http.delete<Department>(this.BaseUrl + 'api/DepartmentApi/' + id)
            .subscribe(result => {
                this.Department = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Department {

    constructor() {

        this.deptId = 0;
       
    }
    public deptId: number;
    public departmentName: string;
    public managerId: number;
    public companyId: number;
   
    public managerError: string;
    public companyError: string;
}

interface Manager {
    managerId: number;
    managerName: string;
   

}
interface Company {
  companyId: number;
  companyName: string;
  companyAddress: string;


}
