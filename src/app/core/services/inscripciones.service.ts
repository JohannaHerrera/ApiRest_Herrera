import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/Inscripcion';
import { BehaviorSubject, Observable, map, mergeMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/environments/test';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private inscripciones$ = new BehaviorSubject<Inscripcion[]>([])

  constructor(private httpClient: HttpClient) {}

  getInscripcionesList(): Observable<Inscripcion[]> {   
    return this.httpClient.get<Inscripcion[]>(`${enviroment.apiBaseUrl}/inscripciones`)
      .pipe(
        tap((inscripciones) => this.inscripciones$.next(inscripciones)),
        mergeMap(() => this.inscripciones$.asObservable())
    );
  }

  getInscripcionById(id: number): Observable<Inscripcion | undefined> {
    return this.inscripciones$.asObservable()
      .pipe(
        map((inscripcion) => inscripcion.find((a) => a.id === id))
      )
  } 

  createInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]>{
    this.inscripciones$.value.push(inscripcion);
    return this.inscripciones$.asObservable();
  }

  deleteInscripcion(id: number): Observable<Inscripcion[]>{
    let index = this.inscripciones$.value.findIndex(item => item.id === id);
    this.inscripciones$.value.splice(index, 1);;
    
    return this.inscripciones$.asObservable();
  }

  deleteAlumnoInscripcion(idAlumno: number): Observable<Inscripcion[]>{
    for (let i = 0; i < this.inscripciones$.value.length; i++) {
      if(this.inscripciones$.value[i].idAlumno === idAlumno){
        this.inscripciones$.value.splice(i, 1);
      }
    }

    return this.inscripciones$.asObservable();
  }

  deleteCursoInscripcion(idCurso: number): Observable<Inscripcion[]>{
    for (let i = 0; i < this.inscripciones$.value.length; i++) {
      if(this.inscripciones$.value[i].idCurso === idCurso){
        this.inscripciones$.value.splice(i, 1);
      }
    }

    return this.inscripciones$.asObservable();
  }
}
