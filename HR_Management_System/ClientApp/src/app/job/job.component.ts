import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-job',
    templateUrl: './job.component.html'
})
export class JobComponent {
    public JobList: Job[];
    public Http: HttpClient;
    public BaseUrl: string;
    public Toastr: ToastrManager;
    public Job: Job;

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, toastr: ToastrManager) {
      this.Http = http;
        this.BaseUrl = baseUrl + 'api/JobApi';
        this.Toastr = toastr;
        this.LoadList();
        this.Toastr.successToastr(' Data loaded successfully', "Success");
    }
    public LoadList() {
        this.Http.get<Job[]>(this.BaseUrl).subscribe(result => {
            this.JobList = result;
        }, error => this.Toastr.errorToastr(error, "error"));
        this.Cancel();
    }
    public Cancel() {

        this.Job = new Job();
    }

    public SubmitJob(form: NgForm) {

        if (this.Job.jobId == 0) {
            this.Http.post<Job>(this.BaseUrl, this.Job)
                .subscribe(result => {

                    this.LoadList();
                    form.reset();
                    $('#jobModal').modal('hide');
                    this.Toastr.successToastr(' Data create successfully', "Success");
                }, error => this.Toastr.errorToastr(error,"error"));
        }
        else {
            this.Http.put<Job>(this.BaseUrl + '/' + this.Job.jobId, this.Job)
                .subscribe(result => {
                    if (result != null) {
                      this.LoadList();
                      form.reset();
                      $('#jobModal').modal('hide');
                      this.Toastr.successToastr(' Data updated successfully', "Success");
                    } else {
                      this.Toastr.errorToastr('Error occured', "error");
                    }
                 
                }, error => this.Toastr.errorToastr(error, "error"));
        }

    }




    public GetJob(id: number) {

        this.Http.get<Job>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Job = result;
                $('#jobModal').modal('show');
            }, error => this.Toastr.errorToastr(error, "error"));

    }

    public DeleteConfirmation(j: Job) {

        this.Job = j;
        $('#deleteModal').modal('show');

    }
    public DeleteJob(id: number) {





        this.Http.delete<Job>(this.BaseUrl + '/' + id)
            .subscribe(result => {
                this.Job = result;
                this.LoadList();
                $('#deleteModal').modal('hide');


            }, error => this.Toastr.errorToastr(error, "error"));

    }
}





class Job {
    jobId: number;
    jobTitle: string;
    minSalary: number;
    maxSalary: number;


    constructor() {
        this.jobId = 0;
       
    }
}
