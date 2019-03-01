import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-beta',
  templateUrl: './beta.component.html',
  styleUrls: ['./beta.component.css']
})
@Injectable()
export class BetaComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  selectedResearch=false;
  users = [];
  sessionVariable = {};
  messageErrors: [];
  sessions = [];
  messages = [];
  users_in_sessions = [];
  constructor(@Inject(SESSION_STORAGE) private storage:StorageService, private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) {}// injection

  //this is to change
  ngOnInit() {
    this.messageErrors= [];
    this.getSessionsFromService();
    this.getAllUsers_in_Sessions();
    this.sessionVariable = sessionStorage;
    console.log(sessionStorage);
  } 
  showResearch(){
    this.selectedResearch = true;
  }
  goHome(){
    this._router.navigate(['/home']);
  }
  getSessionsFromService(){
    let observable = this._httpService.getSessions();
    observable.subscribe(data => {
      console.log('Got all the sessions!', data['data']);
      this.sessions = data['data'];

    });
  }
  deleteSessionFromService(session_id){
    console.log("id of the session in component.ts: "+session_id);
    let observable = this._httpService.deleteSession(sessionStorage.user_id, session_id);
    observable.subscribe(data => {
      // console.log(data['message']);
      this.goHome();
    });
    
  }

  askSessionFromService(session_id){
    console.log("id of the session in component.ts: "+session_id);
    console.log("id of user in component.ts: "+sessionStorage.user_id);
    let observable = this._httpService.askSession(sessionStorage.user_id, session_id);
    observable.subscribe(data => {
      console.log(data['message']);
      this._router.navigate(['/home']);
    });
  }

  leaveSessionFromService(session_id){
    console.log("id of the session in component.ts: "+session_id);
    console.log("id of user in component.ts: "+sessionStorage.user_id);
    let observable = this._httpService.leaveSession(sessionStorage.user_id, session_id);
    observable.subscribe(data => {
      console.log(data['message']);
      this._router.navigate(['/home']);
    });
  }
  getAllUsers_in_Sessions(){
    let observable = this._httpService.getUsers_in_Sessions();
    observable.subscribe(data => {
      console.log('Got all the Users_in_sessions: ', data['data']);
      this.users_in_sessions = data['data'];
    });
  }
  // getMessageFromService(session_id){
  //   let observable = this._httpService.getMessages(session_id);
  //   observable.subscribe(data => {
  //     console.log('Got all messages!', data['data']);
  //     this.messages = data['data'];
  //     this._router.navigate(['/chatroom']);
  //   });
  // }
  

  
}