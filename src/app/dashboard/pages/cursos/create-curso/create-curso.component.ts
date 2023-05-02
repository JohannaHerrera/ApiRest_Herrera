import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-curso',
  templateUrl: './create-curso.component.html',
  styleUrls: ['./create-curso.component.scss']
})
export class CreateCursoComponent {
  nameControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);
  descriptionControl = new FormControl('', [Validators.required, Validators.max(100)]);
  startDateControl = new FormControl('', [Validators.required]);
  endDateControl = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl
  });

  constructor(private matDialogRef: MatDialogRef<CreateCursoComponent>){
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
