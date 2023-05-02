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
    this.cursos$.value.push(curso);
    return this.cursos$.asObservable();
  }

  deleteCurso(id: number): Observable<Curso[]>{
    let index = this.cursos$.value.findIndex(item => item.id === id);
    this.cursos$.value.splice(index, 1);;
    
    return this.cursos$.asObservable();
  }
}
