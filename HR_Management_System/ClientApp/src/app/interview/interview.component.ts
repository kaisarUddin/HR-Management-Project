import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-interview',
    templateUrl: './interview.component.html'
})
export class InterviewComponent {
    public InterviewList: Interview[];
  
    public JobList: Job[];
    public CompanyList: Company[];
    public Http: HttpClient;
    public BaseUrl: string; 
    public Toastr: ToastrManager;
    public Interview: Interview;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr:ToastrManager) {
      this.Http = http;
      this.BaseUrl = baseUrl;
      this.Toastr = toastr;
      this.LoadList();
      this.Toastr.successToastr("Data loaded successfully");
  }
    public LoadList() {
        this.Http.get<Interview[]>(this.BaseUrl + 'api/InterviewApi').subscribe(result => {
            this.InterviewList = result;
        }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
      
        this.LoadJobList();
        this.LoadCompanyList();

    }
  
    public LoadJobList() {

        this.Http.get<Job[]>(this.BaseUrl + 'api/JobApi')
            .subscribe(result => {
                this.JobList = result;
            }, error => error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public LoadCompanyList() {

        this.Http.get<Company[]>(this.BaseUrl + 'api/CompanyApi')
            .subscribe(result => {
                this.CompanyList = result;
            }, error => error => this.Toastr.errorToastr(error, "Error"));
        this.Cancel();
    }
    public Cancel() {

        this.Interview = new Interview();
    }

    public SubmitInterview(form: NgForm): void {

      this.Interview.interviewDate = new Date(this.Interview.interviewDate);


        if (this.Interview.interviewId == 0) {
            this.Http.post<Interview>(this.BaseUrl + 'api/InterviewApi', this.Interview)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#interviewModal').modal('hide');
                    this.Toastr.successToastr("Data saved successfully");
                }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        }
        else {
            this.Http.put<Interview>(this.BaseUrl + 'api/InterviewApi/' + this.Interview.interviewId, this.Interview)
                .subscribe(result => {
                    this.LoadList();
                    form.reset();
                    $('#interviewModal').modal('hide');
                    this.Toastr.successToastr("Data updated successfully");
                }, error =>  error => this.Toastr.errorToastr(error, "Error"));
        }

    }
    public GetInterview(id: number) {

        this.Http.get<Interview>(this.BaseUrl + 'api/InterviewApi/' + id)
            .subscribe(result => {
                this.Interview = result;
                $('#interviewModal').modal('show');
            }, error =>  error => this.Toastr.errorToastr(error, "Error"));

    }

    public DeleteConfirmation(i: Interview) {

        this.Interview = i;
        $('#deleteModal').modal('show');

    }
    public DeleteInterview(id: number) {

        this.Http.delete<Interview>(this.BaseUrl + 'api/InterviewApi/' + id)
            .subscribe(result => {
                this.Interview = result;
                this.LoadList();
                $('#deleteModal').modal('hide');
                this.Toastr.successToastr("Data deleted successfully");
            }, error =>  error => this.Toastr.errorToastr(error, "Error"));

    }
}





class Interview {
  public interviewId: number;
  public candidateName: string;
    public interviewDate: Date;
  public phone: string;
  public interviewer: string;
  public remarks: string;
 
  public jobId: number;
  public jobTitle: string;
  public jobError: string;
  
  public companyId: number;
  public companyName: string;
  public companyError: string;

    constructor() {
      this.interviewId = 0;
    }
}

interface Job {
    jobId: number;
    jobTitle: string;
}
interface Company {
    companyId: number;
    companyName: string;
}
