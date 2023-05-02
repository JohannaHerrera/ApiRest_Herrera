import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inscripcion } from 'src/app/core/models/Inscripcion';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { CreateInscripcionComponent } from './create-inscripcion/create-inscripcion.component';
import { EditInscripcionComponent } from './edit-inscripcion/edit-inscripcion.component';
import { DeleteInscripcionComponent } from './delete-inscripcion/delete-inscripcion.component';
import { ViewInscripcionComponent } from './view-inscripcion/view-inscripcion.component';
import { Alumno } from 'src/app/core/models/Alumno';
import { Curso } from 'src/app/core/models/Curso';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {
  displayedColumns: string[] = ['id', 'idAlumno', 'idCurso', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Inscripcion>();
  alumnosList: Alumno[] = [];
  cursosList: Curso[] = [];
  insDetList: any[] = [];

  constructor(private matDialog: MatDialog, private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService, private cursosService: CursosService) {}

  ngOnInit(): void {     
    this.cursosService.getCursosList()
      .subscribe((cursos) => {
        this.cursosList = cursos;        
    });
    this.alumnosService.getAlumnosList()
      .subscribe((alumnos) => {
        this.alumnosList = alumnos;
    });
    this.inscripcionesService.getInscripcionesList()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
        this.updateinscriptionList();
    });  
  }

  updateinscriptionList(): void{       
    this.insDetList = this.dataSource.data.map(ins => {
      const alumno = this.alumnosList.find(al => al.id === ins.idAlumno);
      const curso = this.cursosList.find(cur => cur.id === ins.idCurso);
      return { ...ins, alumno: alumno?.firstName + ' ' + alumno?.lastName, curso: curso?.name };
    });
  }

  createInscripcion(): void{
    const dialog = this.matDialog.open(CreateInscripcionComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        const alreadyExist = this.dataSource.data.some((reg) => {
          return reg.idAlumno === value.alumno && reg.idCurso === value.curso;
        });
        if(alreadyExist){
          alert('ERROR. El alumno ya está inscrito en este curso.');
        }
        else{
          this.inscripcionesService.createInscripcion(
            {
              ...value,
              idAlumno: value.alumno,
              idCurso: value.curso
            }).subscribe((inscripciones) => {
              this.dataSource.data = inscripciones;
              this.updateinscriptionList();
          })
        }       
      }
    });
  }

  view(inscripcion: Inscripcion): void{
    this.matDialog.open(ViewInscripcionComponent, {
      data: {
        inscripcion
      }
    });
  }

  edit(inscripcion: Inscripcion): void{
    const dialog = this.matDialog.open(EditInscripcionComponent, {
      data: {
        inscripcion
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        const alreadyExist = this.dataSource.data.some((reg) => {
          return reg.idAlumno === value.alumno && reg.idCurso === value.curso;
        });

        if(alreadyExist){
          alert('ERROR. El alumno ya está inscrito en este curso.');
        }
        else{
          this.inscripcionesService.editInscripcion({
            ...value,
            idAlumno: value.alumno,
            idCurso: value.curso,
          }).subscribe((inscripciones) => {
            this.dataSource.data = inscripciones;
          });
          this.updateinscriptionList();
        }
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteInscripcionComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.inscripcionesService.deleteInscripcion(id).subscribe((inscripciones) => {
          this.dataSource.data = inscripciones;
          this.updateinscriptionList();
        })
      }
    });
  }
}
