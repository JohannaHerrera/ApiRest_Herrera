import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/core/models/Usuario';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { ViewUsuarioComponent } from './view-usuario/view-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Usuario>();

  constructor(private matDialog: MatDialog, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuariosList()
      .subscribe((usuarios) => {
        this.dataSource.data = usuarios;
    });
  }

  createUsuario(): void{
    const dialog = this.matDialog.open(CreateUsuarioComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        let idUser = 0;
        if(this.dataSource.data.length === 0){
          idUser = 1;
        }
        else{
          idUser = this.dataSource.data[this.dataSource.data.length-1].id + 1;
        }
        this.usuariosService.createUsuario(
          {
            ...value,
            id: idUser,
            password: '123456'
          }).subscribe((usuarios) => {
            this.dataSource.data = usuarios;
        })    
      }
    });
  }

  view(usuario: Usuario): void{
    this.matDialog.open(ViewUsuarioComponent, {
      data: {
        usuario
      }
    });
  }

  edit(usuario: Usuario): void{
    const dialog = this.matDialog.open(EditUsuarioComponent, {
      data: {
        usuario
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        let index = this.dataSource.data.findIndex(item => item.id === usuario.id);
        this.dataSource.data[index] = {
          ...value,
          id: value.id,
        };
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteUsuarioComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.usuariosService.deleteUsuario(id).subscribe((usuarios) => {
          this.dataSource.data = usuarios;
        })
      }
    });
  }
}
