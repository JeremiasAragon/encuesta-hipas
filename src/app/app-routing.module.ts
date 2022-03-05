import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {SurveyPageComponent} from "./survey-page/survey-page.component";

const routes: Routes = [
  {
    path: 'inicio',
    component: WelcomePageComponent
  },
  {
    path: 'encuesta',
    component: SurveyPageComponent
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
