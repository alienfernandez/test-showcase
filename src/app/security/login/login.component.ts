import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  loginSubscription: Subscription;
  invalidUserPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Login
   */
  login() {
    if (this.loginForm.valid) {
      this.loginSubscription = this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(user => {
          if (user) {
            console.log('Valid user and password, redirecting to home');
            this.router.navigateByUrl('/');
          } else {
            this.invalidUserPassword = true;
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
