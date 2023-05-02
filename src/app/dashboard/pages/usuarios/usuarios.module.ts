import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { ViewUsuarioComponent } from './view-usuario/view-usuario.component';
import { UsuariosComponent } from './usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    UsuariosComponent,
    CreateUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent,
    ViewUsuarioComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
