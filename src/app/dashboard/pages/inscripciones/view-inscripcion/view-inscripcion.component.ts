import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Alumno } from 'src/app/core/models/Alumno';
import { Curso } from 'src/app/core/models/Curso';
import { Inscripcion } from 'src/app/core/models/Inscripcion';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';

@Component({
  selector: 'app-view-inscripcion',
  templateUrl: './view-inscripcion.component.html',
  styleUrls: ['./view-inscripcion.component.scss']
})
export class ViewInscripcionComponent {
  inscripcion: Inscripcion | undefined;
  alumno: Alumno | undefined;
  curso: Curso | undefined;
  alumnosList: Alumno[] = [];
  cursosList: Curso[] = [];

  private destroyed$ = new Subject();

  constructor(private matDialogRef: MatDialogRef<ViewInscripcionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService, private cursosService: CursosService) 
  {
    this.inscripcionesService.getInscripcionById(this.data.inscripcion.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => this.inscripcion = inscripcion);
      this.alumnosService.getAlumnosList()
      .subscribe((alumnos) => {
        this.alumnosList = alumnos;
        this.alumno = this.alumnosList.find(al => al.id === data.inscripcion.idAlumno);
    });
    this.cursosService.getCursosList()
      .subscribe((cursos) => {
        this.cursosList = cursos;
        this.curso = this.cursosList.find(cur => cur.id === data.inscripcion.idCurso);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
