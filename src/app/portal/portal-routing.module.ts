import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutDefaultComponent } from '../layout/default/layout-default/layout-default.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultAuthGuardGuard } from '../security/guards/default-auth-guard.guard';


const routes: Routes = [{
  path: '',
  component: LayoutDefaultComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [DefaultAuthGuardGuard] },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
