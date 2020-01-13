import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})

export class EmployeeComponent {
    public EmployeeList: Employee[];
    public DepartmentList: Department[];
    public JobList: Job[];
    public DesignationList: Designation[];
    public EnlistmentList: Enlistment[];
    public ShiftList: Shift[];


    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Employee: Employee;
    public photoPreview: string | ArrayBuffer;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {

        this.Http = http;
        this.BaseUrl = baseUrl;
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr("Data loaded successfully");
    }

    public LoadList() {

        this.Http.get<Employee[]>(this.BaseUrl + 'api/EmployeesApi')
            .subscribe(result => {
                this.EmployeeList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadList"));
        this.Cancel();
        this.LoadDepartmentList();
        this.LoadJobList();
        this.LoadDesignationList();
        this.LoadShiftList();
        this.LoadEnlistmentList();

    }

    public LoadDepartmentList() {

        this.Http.get<Department[]>(this.BaseUrl + 'api/DepartmentApi')
            .subscribe(result => {
                this.DepartmentList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadDepartmentList"));
   
    }
    public LoadEnlistmentList() {

      this.Http.get<Enlistment[]>(this.BaseUrl + 'api/EnlistmentApi')
        .subscribe(result => {
            this.EnlistmentList = result;
        }, error => this.Toastr.errorToastr(error, "Error LoadEnlistmentList"));

    }
    public LoadJobList() {

        this.Http.get<Job[]>(this.BaseUrl + 'api/JobApi')
            .subscribe(result => {
                this.JobList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadJobList"));
    
    }
    public LoadDesignationList() {

        this.Http.get<Designation[]>(this.BaseUrl + 'api/DesignationApi')
            .subscribe(result => {
                this.DesignationList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadDesignationList"));
     
    }
    public LoadShiftList() {

        this.Http.get<Shift[]>(this.BaseUrl + 'api/ShiftApi')
            .subscribe(result => {
                this.ShiftList = result;
            }, error => this.Toastr.errorToastr(error, "Error LoadShiftList"));
    
    }

    onFileChanged(event) {
      this.Employee.upload = event.target.files[0];
      this.preview();
    }
    preview() {
      // Show preview 
        var mimeType = this.Employee.upload.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }

      var reader = new FileReader();
        reader.readAsDataURL(this.Employee.upload);
      reader.onload = (_event) => {
        this.photoPreview = reader.result;
      }
    }

    public Cancel() {

        this.Employee = new Employee();
        this.photoPreview = null;
    }

    public SubmitEmployee(form: NgForm): void {

      const formData = new FormData();

        formData.append('employeeId', this.Employee.employeeId.toString());
        formData.append('firstName', this.Employee.firstName);
        formData.append('lastName', this.Employee.lastName);
        formData.append('fullName', this.Employee.fullName);
        formData.append('gender', this.Employee.gender);
        formData.append('address', this.Employee.address);
        formData.append('bloodGroup', this.Employee.bloodGroup);
        formData.append('maritalStatus', this.Employee.maritalStatus);
        formData.append('mobileNo', this.Employee.mobileNo);
        formData.append('email', this.Employee.email);
        formData.append('profilePicture', this.Employee.profilePicture);
        formData.append('upload', this.Employee.upload, this.Employee.upload.name);
        formData.append('deptId', this.Employee.deptId.toString());
        formData.append('desigId', this.Employee.deptId.toString());
        formData.append('jobId', this.Employee.jobId.toString());
        formData.append('shiftId', this.Employee.shiftId.toString());
        formData.append('enlistmentId', this.Employee.enlistmentId.toString());


        if (this.Employee.employeeId == 0) {
            this.Http.post<Employee>(this.BaseUrl + 'api/EmployeesApi', formData)
                .subscribe(result => {
                  
                    this.LoadList();
                    form.reset();
                    $('#employeeModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error => this.Toastr.errorToastr(error, "Error SubmitEmployee post"));
        }
        else {
            this.Http.put<Employee>(this.BaseUrl + 'api/EmployeesApi/' + this.Employee.employeeId, formData)
                .subscribe(result => {
                 
                    this.LoadList();
                    form.reset();
                    $('#employeeModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error => this.Toastr.errorToastr(error, "Error SubmitEmployee put"));
        }
    }

    public GetEmployee(id: number) {

        this.Http.get<Employee>(this.BaseUrl + 'api/EmployeesApi/' + id)
            .subscribe(result => {
                this.Employee = result;
                $('#employeeModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "Error GetEmployee"));

    }

    public DeleteConfirmation(e: Employee) {

        this.Employee = e;
        $('#deleteModal').modal('show');

    }
    public DeleteEmployee(id: number) {
        this.Http.delete<Employee>(this.BaseUrl + 'api/EmployeesApi/' + id)
            .subscribe(result => {
                this.Employee = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error => this.Toastr.errorToastr(error, "Error"));

    }
}

class Employee {

    constructor() {

        this.employeeId = 0;
       
    }
    public employeeId: number;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public gender: string;
    public address: string;
    public bloodGroup: string;
    public maritalStatus: string;
    public mobileNo: string;
    public email: string;
    public upload: File;
    public profilePicture: string;
    public deptId: number;
    public jobId: number;
    public desigId: number;
    public shiftId: number;
    public shiftName: string;
   public enlistmentId: number;
   public joinDate: Date;
   public endDate: Date;
   public designationName: string;
    public departmentName: string;
    //public departmentError: string;
    //public jobError: string;
    //public designationError: string;
    //public shiftError: string;
}

interface Department {
    deptId: number;
    departmentName: string;
    managerId: number;
    companyId: number;

}

interface Designation {
    desigId: number;
    designationName: string;
}

interface Job {
    jobId: number;
    jobTitle: string;
    minSalary: number;
    maxSalary: number;
}

interface Shift {
    shiftId: number;
    shiftName: string;
    startTime: number;
    endTime: number;

}
interface Enlistment {
  enlistmentId: number;
  joinDate: Date;
  endDate: Date;
 

}
