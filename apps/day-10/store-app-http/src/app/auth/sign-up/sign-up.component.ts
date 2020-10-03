import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppValidators } from '../../common/app-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, AppValidators.isEmailTakenSync]),
      // email: new FormControl('', [Validators.required, Validators.email], AppValidators.isEmailTakenAsync),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  onSignUp() {
    if (!this.form.valid) {
      return;
    }

    console.log('Sign Up form has valid data. Saving user information...');
    // invoke a service method to save user information

    this.router.navigate(['/products']);
  }

  get Name() {
    return this.form.get('name');
  }

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

}
