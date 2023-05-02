import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlesDirective } from './titles.directive';



@NgModule({
  declarations: [
    TitlesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitlesDirective
  ]
})
export class DirectivesModule { }
