import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Survey} from "../Models/survey.interface";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private firestore: AngularFirestore) { }

  createSurvey(newSurvey: Partial<Survey>, surveyId: string) {
    return from(this.firestore.doc(`surveys/${surveyId}`).set(newSurvey));
  }
}
