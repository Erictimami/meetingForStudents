import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-lambda',
  templateUrl: './lambda.component.html',
  styleUrls: ['./lambda.component.css']
})
export class LambdaComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  title='';
  messageErrors: [];
  data_Session: any;
  newSession: any;
  sessionVariable ={};
  constructor(@Inject(SESSION_STORAGE) private storage:StorageService, private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService, ) {}// injection

  ngOnInit() {
    // inititalisation of some variables here

    //call the function here that we want it to run when we open this page gamma 
    this.sessionVariable = sessionStorage;
    this.messageErrors= [];
    this.newSession={address_1: '', address_2: '', city: '', state: '', zip_code: '', country: '', sujects_study: '', level: '', num_persons: '', date_study: '', time_starting: '', created_at: ''}
  }
  onSubmit(){
    console.log("processing data from form : "+ sessionStorage['user_id']);
    console.log("processing data from form : "+ sessionStorage['username']);
    // this.newSession.created_at = new Date();
    console.log("the data of the new session from form: "+this.newSession);
  
    let observable = this._httpService.createSession(sessionStorage['user_id'], this.newSession);
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

  goHome(){
    this._router.navigate(['/']);
  }
}