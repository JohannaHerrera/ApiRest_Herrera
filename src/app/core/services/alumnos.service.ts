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
    this.httpClient.post<Alumno>(
      `${enviroment.apiBaseUrl}/alumnos`, alumno)
      .subscribe();
    
    return this.getAlumnosList();
  }

  deleteAlumno(id: number): Observable<Alumno[]>{
    this.httpClient.delete<Alumno>(
      `${enviroment.apiBaseUrl}/alumnos/`+ id).subscribe();

    return this.getAlumnosList();
  }

  editAlumno(alumno: Alumno): Observable<Alumno[]>{
    this.httpClient.put<Alumno>(
      `${enviroment.apiBaseUrl}/alumnos/`+ alumno.id, alumno).subscribe();

    return this.getAlumnosList();
  }
}
