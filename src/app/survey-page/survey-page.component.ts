import { Component, OnInit } from '@angular/core';
import * as answers from './answers.data';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {Survey} from "../Models/survey.interface";
import firebase from "firebase/compat/app";
import {SurveyService} from "../services/survey.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {AlertsService} from "../services/alerts.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {

  form!: any;
  surveyId!: string;
  zonas = answers.zonas;
  dropdownOptions = answers;
  ciudadesFiltradas: any[] = [];
  image: string | undefined = '';

  get zona(): AbstractControl { return this.form.get('zona'); }
  get edad(): AbstractControl { return this.form.get('edad'); }
  get ciudad(): AbstractControl { return this.form.get('ciudad'); }
  get esApartado(): AbstractControl { return this.form.get('esApartado'); }
  get sabeCantar(): AbstractControl { return this.form.get('sabeCantar'); }
  get esBautizado(): AbstractControl { return this.form.get('esBautizado'); }
  get estadoCivil(): AbstractControl { return this.form.get('estadoCivil'); }
  get viveConPadres(): AbstractControl { return this.form.get('viveConPadres'); }
  get nivelEducativo(): AbstractControl { return this.form.get('nivelEducativo'); }
  get nombreCompleto(): AbstractControl { return this.form.get('nombreCompleto'); }
  get estaEstudiando(): AbstractControl { return this.form.get('estaEstudiando'); }
  get fechaNacimiento(): AbstractControl { return this.form.get('fechaNacimiento'); }
  get tocaInstrumentos(): AbstractControl { return this.form.get('tocaInstrumentos'); }
  get sirveEnDirectiva(): AbstractControl { return this.form.get('sirveEnDirectiva'); }
  get recibioEspirituSanto(): AbstractControl { return this.form.get('recibioEspirituSanto'); }


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
    private alertsService: AlertsService,
    private angularFirestoreService: AngularFirestore
  ) {
    this.surveyId = this.angularFirestoreService.createId();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      photo: [''],
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: [null, Validators.required],
      edad: [null, Validators.required],
      telefono: [null],
      viveConPadres: [null, Validators.required],
      estadoCivil: ['', Validators.required],
      zona: ['', Validators.required],
      ciudad: ['', Validators.required],
      esBautizado: ['', Validators.required],
      recibioEspirituSanto: ['', Validators.required],
      esApartado: ['', Validators.required],
      sirveEnDirectiva: ['', Validators.required],
      directivas: [''],
      nivelEducativo: ['', Validators.required],
      estaEstudiando: ['', Validators.required],
      titulo: [''],
      sabeCantar: ['', Validators.required],
      tocaInstrumentos: ['', Validators.required],
      instrumentos: ['']
    });

    this.form.controls['fechaNacimiento'].valueChanges
      .subscribe((value: any) => {
        this.form.controls['edad'].setValue(this.calculateAge(value));
      });

    this.form.controls['sirveEnDirectiva'].valueChanges
      .subscribe((value: any) => {
        if(!value) {
          this.form.controls['directivas'].setValue('');
          this.form.controls['directivas'].disable();
        } else {
          this.form.controls['directivas'].enable();
        }
      });

    this.form.controls['tocaInstrumentos'].valueChanges
      .subscribe((value: any) => {
        if(!value) {
          this.form.controls['instrumentos'].setValue('');
          this.form.controls['instrumentos'].disable();
        } else {
          this.form.controls['instrumentos'].enable();
        }
      });
  }

  photoPerson($event:any){
    this.form.patchValue({
      photo: $event
    })
  }

  calculateAge(birthDate: any) {
    let age: number;
    const today = new Date();
    const selectedDate = new Date(birthDate);
    const month = today.getMonth() - selectedDate.getMonth();

    age = today.getFullYear() - selectedDate.getFullYear();

    if (month < 0 || (month === 0 && today.getDate() < selectedDate.getDate())) {
      age--;
    }

    return age;
  }

  getZoneCities(event: any) {
    this.ciudadesFiltradas = [];
    const zonaSeleccionada = event.value;

    this.zonas.map(zona => {
      if(zona.nombre === zonaSeleccionada) {
        this.ciudadesFiltradas = zona.ciudades;
      }
    });
  }

  sendData() {
    if(this.form.invalid) {
      this.spinner.hide();

      this.alertsService.errorMessage(
        '¡Error!',
        'Por favor, verifique la información faltante e intente nuevamente'
      );

      return;
    }

    this.spinner.show();

    const newSurvey = { ...this.form.value } as Survey;
    newSurvey.fechaNacimiento = firebase.firestore.Timestamp.fromDate(this.form.value.fechaNacimiento);

    this.surveyService.createSurvey(newSurvey, this.surveyId)
      .pipe(
        tap(() => {
          this.spinner.hide();

          this.alertsService.successMessage(
            '¡Listo!',
            'Tu información ha sido registrada correctamente'
          );

          this.form.reset();

          this.router.navigate(['/inicio']);
        }),
        catchError(error => {
          this.spinner.hide();

          this.alertsService.errorMessage(
            '¡Error!',
            'No pudimos guardar tu información. Por favor, vuelve a intentarlo más tarde'
          );

          return throwError(error);
        })
      )
      .subscribe();
  }
}
