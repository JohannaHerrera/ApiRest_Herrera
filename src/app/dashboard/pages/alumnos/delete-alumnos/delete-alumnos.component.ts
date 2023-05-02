import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-alumnos',
  templateUrl: './delete-alumnos.component.html',
  styleUrls: ['./delete-alumnos.component.scss']
})
export class DeleteAlumnosComponent {
  constructor(private matDialogRef: MatDialogRef<DeleteAlumnosComponent>){
  }

  delete(): void{
    this.matDialogRef.close(true);
  }
}
