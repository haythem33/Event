import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {ApiService} from '../api.service';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      firstnameValue: [ '' , [Validators.required]],
      lastnameValue: ['', [Validators.required]],
      emailValue: ['', [Validators.required, Validators.email]],
      passwordValue: ['', [Validators.required, Validators.minLength(6)]],
      cpasswordValue: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  passwordValueConfirm;
  message = '';
  ngOnInit() {
  }
  registerTest() {

    // stop here if form is invalid
    if (this.registerForm.valid) {
    this.apiService.registerApi(this.registerForm.value).subscribe(res => {
console.log(res.status);
    });

}

    }
  }

