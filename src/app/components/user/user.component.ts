import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router:Router, private authenticationService:AuthenticationService) { 
    this.authenticationService.sessionSubject.subscribe((session) => {
      if(!session.loggedin){
        if(!this.authenticationService.isLogged()){
          this.router.navigate(['login']);
        }
      }
    });
  }

  ngOnInit() {
    if(!this.authenticationService.isLogged()){
      this.router.navigate(['login']);
    }
  }

}
