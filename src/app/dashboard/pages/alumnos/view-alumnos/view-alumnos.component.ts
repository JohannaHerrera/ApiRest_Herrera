import { Component, OnDestroy } from '@angular/core';
import { Alumno } from '../../../../core/models/Alumno';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Inscripcion } from 'src/app/core/models/Inscripcion';
import { Curso } from 'src/app/core/models/Curso';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-view-alumnos',
  templateUrl: './view-alumnos.component.html',
  styleUrls: ['./view-alumnos.component.scss']
})
export class ViewAlumnosComponent implements OnDestroy {
  alumno: Alumno | undefined;
  inscripcionesList: Inscripcion[] = [];
  cursosList: Curso[] = [];
  insDetList: any[] = [];
  haveCursos: boolean = false;

  private destroyed$ = new Subject()

  constructor(private activatedRoute: ActivatedRoute,
    private alumnosService: AlumnosService, private inscripcionesService: InscripcionesService,
    private cursosService: CursosService) {}

  ngOnInit(): void{
    const idAlumno = parseInt(this.activatedRoute.snapshot.params['id']);
    this.alumnosService.getAlumnoById(idAlumno)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((alumno) => this.alumno = alumno);
    
    this.inscripcionesService.getInscripcionesList()
      .subscribe((inscripciones) => {
        this.inscripcionesList = inscripciones.filter(ins => ins.idAlumno === idAlumno);
    });

    this.cursosService.getCursosList()
      .subscribe((cursos) => {
        this.cursosList = cursos;        
        this.updateinscriptionList() 
        if(this.insDetList.length > 0){
          this.haveCursos = true;
        }
        else{
          this.haveCursos = false;
        }      
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  updateinscriptionList(): void{ 
    this.insDetList = this.inscripcionesList.map(ins => {
      const curso = this.cursosList.find(cur => cur.id === ins.idCurso);
      return { ...ins, curso: curso?.name };
    });
  }

  deleteIns(id: number): void{
    const idAlumno = parseInt(this.activatedRoute.snapshot.params['id']);
    this.inscripcionesService.deleteInscripcion(id).subscribe((inscripciones) => {
      this.inscripcionesList = inscripciones.filter(ins => ins.idAlumno === idAlumno);;
      this.updateinscriptionList();
      if(this.insDetList.length > 0){
        this.haveCursos = true;
      }
      else{
        this.haveCursos = false;
      }
    })
  }
}
