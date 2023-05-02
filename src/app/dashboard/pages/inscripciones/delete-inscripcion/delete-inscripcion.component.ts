import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-inscripcion',
  templateUrl: './delete-inscripcion.component.html',
  styleUrls: ['./delete-inscripcion.component.scss']
})
export class DeleteInscripcionComponent {
  constructor(private matDialogRef: MatDialogRef<DeleteInscripcionComponent>){
  }

  delete(): void{
    this.matDialogRef.close(true);
  }
}
