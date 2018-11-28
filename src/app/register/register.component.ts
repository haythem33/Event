import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  firstnameValue = '';
  lastnameValue = '';
  emailValue = '';
  passwordValue = '';
  cpasswordValue = '';
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.registerForm = new FormGroup({
      firstnameValue: new FormControl('', [Validators.required]),
      lastnameValue: new FormControl('', [Validators.required]),
      emailValue: new FormControl('', [Validators.required, Validators.email]),
      passwordValue: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpasswordValue: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  passwordValueConfirm;
  message = '';
  ngOnInit() {
  }
  onSubmit() {

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('*****' + this.registerForm.value);
      return;
    }
    this.message = '';
    this.apiService.registerApi(this.registerForm.value).subscribe(res => {
      console.log(res);
    });
  }
}

