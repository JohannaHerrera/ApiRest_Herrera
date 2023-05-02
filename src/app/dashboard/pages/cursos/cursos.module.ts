import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { EditCursoComponent } from './edit-curso/edit-curso.component';
import { DeleteCursoComponent } from './delete-curso/delete-curso.component';
import { ViewCursoComponent } from './view-curso/view-curso.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CursosComponent,
    CreateCursoComponent,
    EditCursoComponent,
    DeleteCursoComponent,
    ViewCursoComponent
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
        component: CursosComponent
      },
      {
        path: ':id',
        component: ViewCursoComponent
      }
    ])
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
