import { Injectable } from '@angular/core';
import { Session } from '../shared/session';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private session:Session;
  private baseURL:string = 'http://localhost:3000/';
  private sendMessageSubject = new Subject<Session>();
  sessionSubject = this.sendMessageSubject.asObservable();

  constructor(private http:HttpClient) { 
    this.session = new Session();
    this.sendMessageSubject.next(this.session);
  }

  login(userRequest:User):Observable<User>{

    let httpOptiones = { 
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };

    return this.http.post<User>(this.baseURL + 'login', userRequest, httpOptiones);
  }

  updateSession(logged:boolean){
    this.session.loggedin = logged;
    this.sendMessageSubject.next(this.session);
  }

  logout(){
    this.updateSession(false);
  }

  isLogged(){
    return this.session.loggedin;
  }

  getUsername(){
    return this.session.username;
  }

}
