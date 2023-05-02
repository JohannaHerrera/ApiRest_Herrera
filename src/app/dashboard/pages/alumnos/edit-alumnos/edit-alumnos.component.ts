import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-alumnos',
  templateUrl: './edit-alumnos.component.html',
  styleUrls: ['./edit-alumnos.component.scss']
})
export class EditAlumnosComponent {
  idControl = new FormControl('');
  firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  ageControl = new FormControl('', [Validators.required, Validators.min(1)]);
  gradeControl = new FormControl('', [Validators.required, Validators.max(10)]);

  registerForm = new FormGroup({
    id: this.idControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    age: this.ageControl,
    grade: this.gradeControl
  });

  constructor(private matDialogRef: MatDialogRef<EditAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.firstNameControl.setValue(this.data.alumno.firstName); 
    this.lastNameControl.setValue(this.data.alumno.lastName); 
    this.ageControl.setValue(this.data.alumno.age); 
    this.gradeControl.setValue(this.data.alumno.grade); 
  }

  save(): void{
    if(this.registerForm.valid){
      this.idControl.setValue(this.data.alumno.id);
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
