import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullnamePipe } from './fullname.pipe';
import { ControlErrorsPipe } from './control-errors.pipe';



@NgModule({
  declarations: [
    FullnamePipe,
    ControlErrorsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullnamePipe,
    ControlErrorsPipe
  ]
})
export class PipesModule { }
