import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PortalRoutingModule } from './portal-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [
    SharedModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
