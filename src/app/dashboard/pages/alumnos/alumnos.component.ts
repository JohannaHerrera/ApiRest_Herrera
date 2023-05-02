import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alumno } from 'src/app/core/models/Alumno';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateAlumnosComponent } from './create-alumnos/create-alumnos.component';
import { EditAlumnosComponent } from './edit-alumnos/edit-alumnos.component';
import { DeleteAlumnosComponent } from './delete-alumnos/delete-alumnos.component';
import { ViewAlumnosComponent } from './view-alumnos/view-alumnos.component';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit{
  displayedColumns: string[] = ['id', 'fullName', 'age', 'grade', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Alumno>();
  alumno: Alumno | undefined;

  constructor(private matDialog: MatDialog, private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService, private router: Router,
    private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.alumnosService.getAlumnosList()
      .subscribe((alumnos) => {
        this.dataSource.data = alumnos;
    })  
  }

  createAlumno(): void{
    const dialog = this.matDialog.open(CreateAlumnosComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        let idAl = 0;
        if(this.dataSource.data.length === 0){
          idAl = 1;
        }
        else{
          idAl = this.dataSource.data[this.dataSource.data.length-1].id + 1;
        }
        this.alumnosService.createAlumno(
          {
            ...value,
            id: idAl
          }).subscribe((alumnos) => {
              this.dataSource.data = alumnos;
        })
      }
    });
  }

  view(id: number): void{
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }

  edit(alumno: Alumno): void{
    const dialog = this.matDialog.open(EditAlumnosComponent, {
      data: {
        alumno
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        let index = this.dataSource.data.findIndex(item => item.id === alumno.id);
        this.dataSource.data[index] = value;
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  delete(id: number): void{
    // const dialog = this.matDialog.open(DeleteAlumnosComponent);
    // dialog.afterClosed().subscribe((value) => {
    //   if(value){
    //     this.dataSource.data = this.dataSource.data.filter((alumno) => {
    //       return alumno.id !== id;});
    //   }
    // });

    const dialog = this.matDialog.open(DeleteAlumnosComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.alumnosService.deleteAlumno(id).subscribe((alumnos) => {
          this.dataSource.data = alumnos;
        });
        this.inscripcionesService.deleteAlumnoInscripcion(id);
      }
    });
  }
}
