import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/Alumno';
import { Curso } from 'src/app/core/models/Curso';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-create-inscripcion',
  templateUrl: './create-inscripcion.component.html',
  styleUrls: ['./create-inscripcion.component.scss']
})
export class CreateInscripcionComponent {
  alumnoControl = new FormControl('', [Validators.required]);
  cursoControl = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    alumno: this.alumnoControl,
    curso: this.cursoControl
  });

  alumnosList: Alumno[] = [];
  cursosList: Curso[] = [];

  constructor(private matDialogRef: MatDialogRef<CreateInscripcionComponent>, 
    private alumnosService: AlumnosService, private cursosService: CursosService){
  }

  ngOnInit(): void {
    this.alumnosService.getAlumnosList()
      .subscribe((alumnos) => {
        this.alumnosList = alumnos;
    });
    this.cursosService.getCursosList()
      .subscribe((cursos) => {
        this.cursosList = cursos;
    });
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
