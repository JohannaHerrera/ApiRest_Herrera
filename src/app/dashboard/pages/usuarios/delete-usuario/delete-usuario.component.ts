import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.scss']
})
export class DeleteUsuarioComponent {
  constructor(private matDialogRef: MatDialogRef<DeleteUsuarioComponent>){
  }

  delete(): void{
    this.matDialogRef.close(true);
  }
}
