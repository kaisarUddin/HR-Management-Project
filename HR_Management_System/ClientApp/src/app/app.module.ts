import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DepartmentComponent } from './department/department.component';
import { EnlistmentComponent } from './enlistment/enlistment.component';
import {EmployeeComponent } from './employee/employee.component';
import { LeaveComponent } from './leave/leave.component';
import { PayrollPolicyComponent } from './payrollPolicy/payrollPolicy.component';
import { SalaryComponent } from './salary/salary.component';
import { ShiftComponent } from './shift/shift.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { DesignationComponent } from './designation/designation.component';
import { ManagerComponent } from './manager/manager.component';
import { CompanyComponent } from './company/company.component';
import { RemarksComponent } from './remarks/remarks.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ExpensesComponent } from './expenses/expenses.component';
 import { InterviewComponent } from './interview/interview.component';
 import { TrainingComponent } from './training/training.component';
import { JobComponent } from './job/job.component'; 
import { HolidayComponent } from './holiday/holiday.component'; 
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';

import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { MaterialModule } from './material/material.module';

@
NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DesignationComponent,
        DepartmentComponent,
    EmployeeComponent,
    EnlistmentComponent,
    LeaveComponent,
    SalaryComponent,
        ShiftComponent,
    TrainingComponent,
    CompanyComponent,
        ManagerComponent,
        RemarksComponent,
        AttendanceComponent,
        ExpensesComponent,
    InterviewComponent,
    JobComponent,
    HolidayComponent,
    PayrollPolicyComponent,
        AnnouncementComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      ApiAuthorizationModule,
      BrowserAnimationsModule,
      NgxPaginationModule,
      NgxPrintModule,
    MaterialModule,
      ToastrModule.forRoot(),

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'designation', component: DesignationComponent }, 
        { path: 'department', component: DepartmentComponent }, 
        { path: 'leave', component: LeaveComponent }, 
        { path: 'payrollPolicy', component: PayrollPolicyComponent }, 
        { path: 'salary', component: SalaryComponent }, 
        { path: 'shift', component: ShiftComponent }, 
        { path: 'manager', component: ManagerComponent }, 
        { path: 'company', component: CompanyComponent }, 
        { path: 'announcement', component: AnnouncementComponent }, 
        { path: 'attendance', component: AttendanceComponent }, 
        { path: 'expenses', component: ExpensesComponent }, 
       { path: 'interview', component: InterviewComponent}, 
        { path: 'training', component: TrainingComponent}, 
        { path: 'job', component: JobComponent}, 
        { path: 'holiday', component: HolidayComponent}, 
        { path: 'enlistment', component: EnlistmentComponent}, 
        { path: 'remarks', component: RemarksComponent }, 
        { path: 'employee', component: EmployeeComponent }, 
      { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
