import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-epsilon',
  templateUrl: './epsilon.component.html',
  styleUrls: ['./epsilon.component.css']
})
export class EpsilonComponent implements OnInit {

  title='';
  messageErrors: [];
  data_Session: any;
  newSession: any;
  sessionVariable ={};
  session_id: any;
  constructor(@Inject(SESSION_STORAGE) private storage:StorageService, private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService, ) {}// injection


  ngOnInit() {
  // inititalisation of some variables here
  this.sessionVariable = sessionStorage;
  this.messageErrors= [];
  this.newSession={address_1: '', address_2: '', city: '', state: '', zip_code: '', country: '', sujects_study: '', level: '', num_persons: '', date_study: '', time_starting: '', created_at: ''}
    
  //call the function here that we want it to run when we open this page gamma 
    // this.getSessionForUpdate(id);
    this._route.params.subscribe((params: Params) => {
      this.getSessionForUpdate(params['id']);
      this.session_id = params['id'];
    });
  }

  getSessionForUpdate(id){
    let observable = this._httpService.getOneSession(id);
    observable.subscribe(data => {
      if(data['Error']){
        console.log('Error here during the getting data for update');
        // this.messageErrors = data['message'];
        // console.log('Error messages to display: '+this.messageErrors);
      } else{
        this.newSession = data['data'][0];
        console.log('Getting session for update Success: '+this.newSession);
      }
    })
  }

  onSubmit(){
    console.log("processing updated data from form : "+ sessionStorage['user_id']);
    console.log("processing updated data from form : "+ sessionStorage['username']);
    // this.newSession.created_at = new Date();
    console.log("the updated data of the new session from form: "+this.newSession);
    console.log('the session_id : '+this.session_id);
    let observable = this._httpService.updateSession(this.session_id, this.newSession);
    observable.subscribe(data => {
      if(data['Error']){
        console.log("here into process of subscribe");
        this.messageErrors=data['message'];
        console.log("Error messages to display: "+this.messageErrors);
      } else{
        this.data_Session=data['data'];
        console.log('%%%%%%%%LambdacomponentReturn%%%%%%%%: '+data['data']);
        this._router.navigate(['/home']);
      }           
    })
  }

}
