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
    this.httpClient.post<Inscripcion>(
      `${enviroment.apiBaseUrl}/inscripciones`, inscripcion)
      .subscribe();
    
    return this.getInscripcionesList();
  }

  deleteInscripcion(id: number): Observable<Inscripcion[]>{
    this.httpClient.delete<Inscripcion>(
      `${enviroment.apiBaseUrl}/inscripciones/`+ id).subscribe();

    return this.getInscripcionesList();
  }

  deleteAlumnoInscripcion(idAlumno: number): Observable<Inscripcion[]>{
    for (let i = 0; i < this.inscripciones$.value.length; i++) {
      if(this.inscripciones$.value[i].idAlumno === idAlumno){
        this.deleteInscripcion(this.inscripciones$.value[i].id);
      }
    }

    return this.inscripciones$.asObservable();
  }

  deleteCursoInscripcion(idCurso: number): Observable<Inscripcion[]>{
    for (let i = 0; i < this.inscripciones$.value.length; i++) {
      if(this.inscripciones$.value[i].idCurso === idCurso){
        this.deleteInscripcion(this.inscripciones$.value[i].id);
      }
    }

    return this.inscripciones$.asObservable();
  }

  editInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]>{
    this.httpClient.put<Inscripcion>(
      `${enviroment.apiBaseUrl}/inscripciones/`+ inscripcion.id, inscripcion).subscribe();

    return this.getInscripcionesList();
  }
}
