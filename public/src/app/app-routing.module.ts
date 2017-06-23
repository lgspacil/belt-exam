import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { CreatePollComponent } from "app/create-poll/create-poll.component";
import { SurveyPollComponent } from "app/survey-poll/survey-poll.component";
import { AppComponent } from "app/app.component";

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {path: '', component: AppComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'create_new_poll', component: CreatePollComponent},
  {path: 'survey/:id', component: SurveyPollComponent},
  {path: 'polls', component:DashboardComponent},

  
  

  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
