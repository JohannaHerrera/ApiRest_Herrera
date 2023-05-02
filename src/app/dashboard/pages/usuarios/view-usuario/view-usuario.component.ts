import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/models/Usuario';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.component.html',
  styleUrls: ['./view-usuario.component.scss']
})
export class ViewUsuarioComponent {
  usuario: Usuario | undefined;
  private destroyed$ = new Subject();

  constructor(private matDialogRef: MatDialogRef<ViewUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private usuariosService: UsuariosService) 
  {
    this.usuariosService.getUsuarioById(this.data.usuario.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((usuario) => this.usuario = usuario);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
