import { Component, OnInit } from '@angular/core';
import * as answers from './answers.data';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {

  form!: FormGroup;
  zonas = answers.zonas;
  dropdownOptions = answers;
  ciudadesFiltradas: any[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: [null, Validators.required],
      telefono: [null, Validators.required],
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
      .subscribe((value) => {
        this.form.controls['edad'].setValue(this.calculateAge(value));
      });
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
    console.log(this.form.value);
  }
}
