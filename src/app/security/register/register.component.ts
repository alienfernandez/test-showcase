import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, AppValidators.password]],
      confirm: ['', [Validators.required, AppValidators.password]],
    }, {
      validators: [AppValidators.matchPasswords('password', 'confirm')]
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log('Submitted for to backend, navigating to home');
      this.router.navigateByUrl('/');
    }
  }

}
