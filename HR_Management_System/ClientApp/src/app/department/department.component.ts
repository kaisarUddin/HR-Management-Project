import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;


@Component({
    selector: 'app-department',
    templateUrl: './department.component.html'
})
export class DepartmentComponent {
    public DepartmentList: Department[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Department: Department;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.Http = http;
      this.BaseUrl = baseUrl + 'api/Department';
      this.LoadList();
    }
    public LoadList() {
        this.Http.get<Department[]>(this.BaseUrl ).subscribe(result => {
            this.DepartmentList = result;
        }, error => console.error(error));
        this.Cancel();
    }
    public Cancel() {

        this.Department = new Department();
    }
}

class Department {
    deptId: number;
    departmentName: string;


    constructor() {
        this.deptId = 0;
        this.departmentName = '';
    }
}
