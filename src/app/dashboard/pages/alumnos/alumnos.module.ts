import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AlumnosComponent } from './alumnos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditAlumnosComponent } from './edit-alumnos/edit-alumnos.component';
import { DeleteAlumnosComponent } from './delete-alumnos/delete-alumnos.component';
import { CreateAlumnosComponent } from './create-alumnos/create-alumnos.component';
import { ViewAlumnosComponent } from './view-alumnos/view-alumnos.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AlumnosComponent,
    EditAlumnosComponent,
    DeleteAlumnosComponent,
    CreateAlumnosComponent,
    ViewAlumnosComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlumnosComponent
      },
      {
        path: ':id',
        component: ViewAlumnosComponent
      }
    ])
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
