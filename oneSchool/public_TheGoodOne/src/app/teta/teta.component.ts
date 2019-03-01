import { Component, OnInit, Input, Injectable, Inject} from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-teta',
  templateUrl: './teta.component.html',
  styleUrls: ['./teta.component.css']
})
export class TetaComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  selectedResearch = false;
  sessionVariable = {};
  mySessions = [];
  sessions = [];
  users_in_sessions = [];
  constructor(@Inject(SESSION_STORAGE) private storage:StorageService, private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) {}// injection

  ngOnInit() {
    // this.newMovie = {name: '', cuisine: ''};
    // this._route.params.subscribe((params: Params) => {
    //   console.log(params['id']);
    //   // this.goHome();
    // });
    this.sessionVariable = sessionStorage;
    console.log(sessionStorage);
    this.getMySessionsFromService();
    this.getSessionsFromService();
    this.getAllUsers_in_Sessions();
  }
  showResearch(){
    this.selectedResearch = true;
  }
  goHome(){
    this._router.navigate(['/']);
  }
  getSessionsFromService(){
    let observable = this._httpService.getSessions_2();
    observable.subscribe(data => {
      console.log('Got all the sessions for:!', data['data']);
      this.sessions = data['data'];

    });
  }
  getMySessionsFromService(){
    let observable = this._httpService.getMySessions(sessionStorage['user_id']);
    observable.subscribe(data => {
      // console.log('Got all my Sessions: ', data['data']);
      this.mySessions = data['data'];
    })
  }
  leaveSessionFromService(session_id){
    console.log(sessionStorage['user_id']+' '+session_id);
    let observable = this._httpService.leaveSession(Number(sessionStorage['user_id']), session_id);
    observable.subscribe(data => {
      console.log(data['message']);
      this._router.navigate(['/home']);
    })
  }
  getAllUsers_in_Sessions(){
    let observable = this._httpService.getUsers_in_Sessions();
    observable.subscribe(data => {
      console.log('Got users_in_sessions!', data['data']);
      this.users_in_sessions = data['data'];
    });
  }

}



