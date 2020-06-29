import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  
  constructor(
    private formBuilder:FormBuilder, 
    private authenticationService:AuthenticationService,
    private router:Router) { 

    this.createForm();
  }

  ngOnInit() {
    if(this.authenticationService.isLoggedin()){
      this.router.navigate(['home']);
    }
  }

  createForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    this.authenticationService.login().then(result=>{
      if(result){
        if(this.authenticationService.isLoggedin()){
          this.router.navigate(['home']);
        }
      }
    });
  }
}
