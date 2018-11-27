import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.registerForm = new FormGroup({
      nameValue: new FormControl('', [Validators.required, Validators.minLength(10)]),
      emailValue: new FormControl('', [Validators.required, Validators.email]),
      passwordValue: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  passwordValueConfirm;
  ngOnInit() {
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    console.log(this.registerForm.hasError('required'));
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('YOUR ACCOUNT HAS BEEN CREATED!! :-)');
  }

}

