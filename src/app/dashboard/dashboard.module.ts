import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InscripcionesModule,
    UsuariosModule,
    RouterModule.forChild([
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'alumnos',
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)     
      },
      {
        path: 'cursos',
        loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule)        
      },
      {
        path: 'inscripciones',
        component: InscripcionesComponent
      }
    ])
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
