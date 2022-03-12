import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {MultiSelectModule} from 'primeng/multiselect';
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule, USE_EMULATOR} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireFunctionsModule} from "@angular/fire/compat/functions";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    SurveyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    NgxSpinnerModule,
    MultiSelectModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ],
  providers: [
    { provide: USE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8082] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
