import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, tap } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/environments/test';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios$ = new BehaviorSubject<Usuario[]>([])

  constructor(private httpClient: HttpClient) {}

  getUsuariosList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`)
      .pipe(
        tap((usuarios) => this.usuarios$.next(usuarios)),
        mergeMap(() => this.usuarios$.asObservable())
    );
  }

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    return this.usuarios$.asObservable()
      .pipe(
        map((usuario) => usuario.find((a) => a.id === id))
      )
  }

  createUsuario(usuario: Usuario): Observable<Usuario[]>{
    this.usuarios$.value.push(usuario);
    return this.usuarios$.asObservable();
  }

  deleteUsuario(id: number): Observable<Usuario[]>{
    let index = this.usuarios$.value.findIndex(item => item.id === id);
    this.usuarios$.value.splice(index, 1);;
    
    return this.usuarios$.asObservable();
  }
}
