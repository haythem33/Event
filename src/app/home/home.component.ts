import { Component, OnInit } from '@angular/core';
import {ApiService } from '../api.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageUser: File = null;
  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }
  uploadFile() {
    const fb = new FormData();
    fb.append('image', this.imageUser);
    // tslint:disable-next-line:max-line-length
    this.apiService.uploadFile(fb).subscribe(res => {
      console.log(res);
    });
}
}
