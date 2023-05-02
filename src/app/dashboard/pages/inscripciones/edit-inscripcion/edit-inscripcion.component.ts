import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/Alumno';
import { Curso } from 'src/app/core/models/Curso';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-edit-inscripcion',
  templateUrl: './edit-inscripcion.component.html',
  styleUrls: ['./edit-inscripcion.component.scss']
})
export class EditInscripcionComponent {
  idControl = new FormControl('');
  alumnoControl = new FormControl('', [Validators.required]);
  cursoControl = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    id: this.idControl,
    alumno: this.alumnoControl,
    curso: this.cursoControl
  });

  alumnosList: Alumno[] = [];
  cursosList: Curso[] = [];


  constructor(private matDialogRef: MatDialogRef<EditInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private alumnosService: AlumnosService, 
    private cursosService: CursosService) { 
    this.alumnoControl.setValue(this.data.inscripcion.idAlumno); 
    this.cursoControl.setValue(this.data.inscripcion.idCurso); 
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
      this.idControl.setValue(this.data.inscripcion.id);
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
