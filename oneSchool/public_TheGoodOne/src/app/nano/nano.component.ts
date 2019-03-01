import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-nano',
  templateUrl: './nano.component.html',
  styleUrls: ['./nano.component.css']
})
@Injectable()
export class NanoComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  selectedResearch=false;
  users = [];
  sessionVariable = {};
  messageErrors: [];
  requests = [];
  messages = [];
  users_in_sessions = [];
  constructor(@Inject(SESSION_STORAGE) private storage:StorageService, private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) {}// injection

  //this is to change
  ngOnInit() {
    this.messageErrors= [];
    this.sessionVariable = sessionStorage;
    console.log(sessionStorage);
    this.getRequestsFromService();
  }

  getRequestsFromService(){
    let observable = this._httpService.getRequests(sessionStorage.user_id);
    observable.subscribe(data => {
      console.log('Got all the requests!', data['data']);
      this.requests = data['data'];
    });
  }

  leaveSessionFromService(user_id, session_id){
    console.log("id of the session in component.ts: "+session_id);
    console.log("id of user in component.ts: "+user_id);
    let observable = this._httpService.leaveSession(user_id, session_id);
    observable.subscribe(data => {
      console.log(data['message']);
      this._router.navigate(['/home']);
    });
  }

  acceptRequestFromService(user_id, session_id){
    console.log("id of the session in component.ts: "+session_id);
    console.log("id of user in component.ts: "+user_id);
    let observable = this._httpService.acceptRequest(user_id, session_id);
    observable.subscribe(data => {
      console.log('confirmation AcceptRequest: '+data['message']);
      this._router.navigate(['/requestsForSession']);
    });
  }

}


