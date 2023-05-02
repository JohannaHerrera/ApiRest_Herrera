import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, mergeMap, tap } from 'rxjs';
import { Curso } from '../models/Curso';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/environments/test';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos$ = new BehaviorSubject<Curso[]>([])

  constructor(private httpClient: HttpClient) {}

  getCursosList(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${enviroment.apiBaseUrl}/cursos`)
      .pipe(
        tap((cursos) => this.cursos$.next(cursos)),
        mergeMap(() => this.cursos$.asObservable())
    );
  }

  getCursoById(id: number): Observable<Curso | undefined> {
    return this.cursos$.asObservable()
      .pipe(
        map((curso) => curso.find((a) => a.id === id))
      )
  }

  createCurso(curso: Curso): Observable<Curso[]>{
    this.httpClient.post<Curso>(
      `${enviroment.apiBaseUrl}/cursos`, curso)
      .subscribe();
    
    return this.getCursosList();
  }

  deleteCurso(id: number): Observable<Curso[]>{
    this.httpClient.delete<Curso>(
      `${enviroment.apiBaseUrl}/cursos/`+ id).subscribe();

    return this.getCursosList();
  }

  editCurso(curso: Curso): Observable<Curso[]>{
    this.httpClient.put<Curso>(
      `${enviroment.apiBaseUrl}/cursos/`+ curso.id, curso).subscribe();

    return this.getCursosList();
  }
}
