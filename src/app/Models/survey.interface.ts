import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Survey {
  id: string;
  nombreCompleto: string;
  fechaNacimiento: Timestamp;
  edad: number;
  telefono?: string;
  viveConPadres: boolean;
  estadoCivil: string;
  zona: string;
  ciudad: string;
  esBautizado: boolean;
  recibioEspirituSanto: boolean;
  esApartado: boolean;
  sirveEnDirectiva: boolean;
  directivas?: string[];
  nivelEducativo: string;
  estaEstudiando: boolean;
  titulo?: string;
  sabeCantar: boolean;
  tocaInstrumentos: boolean;
  instrumentos?: string[];
}
