import { Injectable } from '@angular/core';
import { Session } from '../shared/session';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private session:Session;
  private baseURL:string = 'http://localhost:8080/';
  private sendMessageSubject = new Subject<Session>();
  sessionSubject = this.sendMessageSubject.asObservable();

  constructor(private http:HttpClient) { 
    this.session = new Session();
    this.sendMessageSubject.next(this.session);
  }

  login():Promise<boolean>{
    
    let promise = new Promise<boolean>((resolve, reject) => {
      this.session.loggedin = true;

      let httpOptiones = { 
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      };
      
      this.http.get(this.baseURL + 'login', this.session, httpOptiones);


      this.sendMessageSubject.next(this.session);
      resolve(this.session.loggedin);
    });
    return promise;
  }

  logout(){
    this.session.loggedin = false;
    this.sendMessageSubject.next(this.session);
  }

  isLoggedin(){
    return this.session.loggedin;
  }

  getUsername(){
    return this.session.username;
  }

}
