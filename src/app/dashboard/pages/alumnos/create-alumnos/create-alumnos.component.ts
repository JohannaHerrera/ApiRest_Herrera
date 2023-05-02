import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-alumnos',
  templateUrl: './create-alumnos.component.html',
  styleUrls: ['./create-alumnos.component.scss']
})
export class CreateAlumnosComponent {
  firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  ageControl = new FormControl('', [Validators.required, Validators.min(1)]);
  gradeControl = new FormControl('', [Validators.required, Validators.max(10)]);

  registerForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    age: this.ageControl,
    grade: this.gradeControl
  });

  constructor(private matDialogRef: MatDialogRef<CreateAlumnosComponent>){
  }

  save(): void{
    if(this.registerForm.valid){
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
