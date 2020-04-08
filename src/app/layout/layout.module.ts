import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './default/content/content.component';
import { HeaderComponent } from './default/header/header.component';
import { LayoutDefaultComponent } from './default/layout-default/layout-default.component';


@NgModule({
  declarations: [HeaderComponent, ContentComponent, LayoutDefaultComponent],
  imports: [SharedModule]
})
export class LayoutModule { }
