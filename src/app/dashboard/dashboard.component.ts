import { Component, OnDestroy } from '@angular/core';
import Links from '../core/models/Links';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../core/models/Usuario';
import { enviroment } from '../environments/test';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  routerLinks = Links;
  showFiller = false;
  isProd = enviroment.isProduction;
  authUser$: Observable<Usuario | null>;
  destroyed$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }
}
