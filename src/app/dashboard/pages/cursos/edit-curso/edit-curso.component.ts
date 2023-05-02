import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-curso',
  templateUrl: './edit-curso.component.html',
  styleUrls: ['./edit-curso.component.scss']
})
export class EditCursoComponent {
  idControl = new FormControl('');
  nameControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);
  descriptionControl = new FormControl('', [Validators.required, Validators.max(100)]);
  startDateControl = new FormControl('', [Validators.required]);
  endDateControl = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    description: this.descriptionControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl
  });

  constructor(private matDialogRef: MatDialogRef<EditCursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.nameControl.setValue(this.data.curso.name); 
    this.descriptionControl.setValue(this.data.curso.description); 
    this.startDateControl.setValue(formatDate(this.data.curso.startDate, 'yyyy-MM-dd','en')); 
    this.endDateControl.setValue(formatDate(this.data.curso.endDate, 'yyyy-MM-dd','en')); 
  }

  save(): void{
    if(this.registerForm.valid){
      this.idControl.setValue(this.data.curso.id);
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
