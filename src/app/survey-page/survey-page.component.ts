import { Component, OnInit } from '@angular/core';
import * as answers from './answers.data';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {

  form!: any;
  zonas = answers.zonas;
  dropdownOptions = answers;
  ciudadesFiltradas: any[] = [];

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
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
      Swal.fire({
        title: '¡Error!',
        text: 'Verifica la información faltante e intenta nuevamente',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });

      return;
    }

    console.log(this.form.value);

    Swal.fire({
      title: '¡Listo!',
      text: 'Tu información ha sido registrada con éxito',
      icon: 'success',
      confirmButtonText: 'Entendido'
    });

    this.form.reset();
  }
}
