export class Session {
    username:string;
    password:string;
    loggedin:boolean;

    constructor(){
        this.loggedin = false;
    }
}