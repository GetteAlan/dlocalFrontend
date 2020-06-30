import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  wronglogin:boolean;

  constructor(
    private formBuilder:FormBuilder, 
    private authenticationService:AuthenticationService,
    private router:Router) { 

    this.createForm();
  }

  ngOnInit() {
    if(this.authenticationService.isLogged()){
      this.router.navigate(['home']);
    }
  }

  createForm(){
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    let user:User = this.formLogin.value;
    this.authenticationService.login(user).subscribe((user)=>{
      if(user){
        if(user.username === user.username && user.password === user.password){
          this.authenticationService.updateSession(true);
          this.router.navigate(['home']);
        }else {
          this.authenticationService.updateSession(false);
          this.wronglogin = true;
        }
      }else{
        this.authenticationService.updateSession(false);
        this.wronglogin = true;
      }
    });
  }



}
