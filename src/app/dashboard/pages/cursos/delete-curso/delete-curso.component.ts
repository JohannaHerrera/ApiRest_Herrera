import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-curso',
  templateUrl: './delete-curso.component.html',
  styleUrls: ['./delete-curso.component.scss']
})
export class DeleteCursoComponent {
  constructor(private matDialogRef: MatDialogRef<DeleteCursoComponent>){
  }

  delete(): void{
    this.matDialogRef.close(true);
  }
}
