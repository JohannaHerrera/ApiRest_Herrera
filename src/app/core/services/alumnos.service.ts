import { Injectable } from '@angular/core';
import { Alumno } from '../models/Alumno';
import { BehaviorSubject, Observable, Subject, map, mergeMap, tap } from 'rxjs';
import { enviroment } from 'src/app/environments/test';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  
  private alumnos$ = new BehaviorSubject<Alumno[]>([])

  constructor(private httpClient: HttpClient) {}

  getAlumnosList(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${enviroment.apiBaseUrl}/alumnos`)
      .pipe(
        tap((alumnos) => this.alumnos$.next(alumnos)),
        mergeMap(() => this.alumnos$.asObservable())
    );
  }

  getAlumnoById(id: number): Observable<Alumno | undefined> {
    return this.alumnos$.asObservable()
      .pipe(
        map((alumno) => alumno.find((a) => a.id === id))
      )
  }

  // getAlumnoById(id: number): Observable<Alumno> {
  //   return this.httpClient.get<Alumno>(
  //     `${enviroment.apiBaseUrl}/alumnos`, {
  //       params: {
  //         id
  //       },
  //     });
  // }

  createAlumno(alumno: Alumno): Observable<Alumno[]>{
    this.alumnos$.value.push(alumno);
    return this.alumnos$.asObservable();
  }

  deleteAlumno(id: number): Observable<Alumno[]>{
    let index = this.alumnos$.value.findIndex(item => item.id === id);
    this.alumnos$.value.splice(index, 1);;
    
    return this.alumnos$.asObservable();
  }
}
