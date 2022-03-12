import {Injectable} from "@angular/core";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  errorMessage(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  }

  successMessage(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Entendido'
    });
  }
}
