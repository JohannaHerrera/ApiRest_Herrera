import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from 'src/app/core/models/Curso';
import { takeUntil, Subject } from 'rxjs';
import { CursosService } from 'src/app/core/services/cursos.service';
import { ActivatedRoute } from '@angular/router';
import { Inscripcion } from 'src/app/core/models/Inscripcion';
import { Alumno } from 'src/app/core/models/Alumno';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';

@Component({
  selector: 'app-view-curso',
  templateUrl: './view-curso.component.html',
  styleUrls: ['./view-curso.component.scss']
})
export class ViewCursoComponent {
  curso: Curso | undefined;
  inscripcionesList: Inscripcion[] = [];
  alumnosList: Alumno[] = [];
  insDetList: any[] = [];
  haveAlumnos: boolean = false;

  private destroyed$ = new Subject()

  constructor(private activatedRoute: ActivatedRoute, private cursosService: CursosService,
    private alumnosService: AlumnosService, private inscripcionesService: InscripcionesService,) 
  {
    const idCurso = parseInt(this.activatedRoute.snapshot.params['id']);
    this.cursosService.getCursoById(idCurso)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((curso) => this.curso = curso);
    
      this.inscripcionesService.getInscripcionesList()
      .subscribe((inscripciones) => {
        this.inscripcionesList = inscripciones.filter(ins => ins.idCurso === idCurso);
    });

    this.alumnosService.getAlumnosList()
      .subscribe((alumnos) => {
        this.alumnosList = alumnos;
        this.updateinscriptionList();
        if(this.insDetList.length > 0){
          this.haveAlumnos = true;
        }
        else{
          this.haveAlumnos = false;
        }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  updateinscriptionList(): void{
    this.insDetList = this.inscripcionesList.map(ins => {
      const alumno = this.alumnosList.find(al => al.id === ins.idAlumno);
      return { ...ins, alumno: alumno?.firstName + ' ' +  alumno?.lastName};
    });
  }

  deleteIns(id: number): void{
    const idCurso = parseInt(this.activatedRoute.snapshot.params['id']);
    this.inscripcionesService.deleteInscripcion(id).subscribe((inscripciones) => {
      this.inscripcionesList = inscripciones.filter(ins => ins.idCurso === idCurso);;
      this.updateinscriptionList();
      if(this.insDetList.length > 0){
        this.haveAlumnos = true;
      }
      else{
        this.haveAlumnos = false;
      }
    })
  }
}
