import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    SharedModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
