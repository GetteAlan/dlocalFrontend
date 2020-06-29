import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authenticationService:AuthenticationService) { 
    this.authenticationService.sessionSubject.subscribe((session) => {
      if(!session.loggedin){
        if(!this.authenticationService.isLoggedin()){
          this.router.navigate(['login']);
        }
      }
    });
  }

  ngOnInit() {
    if(!this.authenticationService.isLoggedin()){
      this.router.navigate(['login']);
    }
  }

  login(){
    this.authenticationService.login().then();
    
  }

  logout(){
    this.authenticationService.logout();

  }

  getUrl(){
    return this.router.url;
  }

  getUsername(){
    return this.authenticationService.getUsername();
  }
}
