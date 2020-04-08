import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './components';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { sharedDirectives } from './directives';

const sharedModules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [...sharedDirectives, ...sharedComponents],
  imports: [...sharedModules],
  exports: [...sharedModules, ...sharedDirectives, ...sharedComponents],
  entryComponents: [ControlErrorComponent]
})
export class SharedModule { }
