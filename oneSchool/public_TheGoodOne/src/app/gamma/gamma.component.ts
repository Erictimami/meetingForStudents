import { Component, OnInit, Input, Inject, Injectable} from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.css']
})
export class GammaComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  title='';
  newLogin: any;
  messageErrors = [];
  data_User: any;
  constructor(private _route: ActivatedRoute, 
    private _router: Router, 
    private _httpService: HttpService, 
    @Inject(SESSION_STORAGE) private storage: StorageService) {}// injection

  // movies =[];
  ngOnInit() {
    // inititalisation of some variables here
    this.newLogin = {username: '', password: ''};
    this.messageErrors = [];
    this.data_User = {user_id: '', username: '', email: ''};
    //call the function here that we want it to run when we open this page gamma 

  }

  onSubmit(){
    let observable = this._httpService.getOneUserByUsername(this.newLogin);
    observable.subscribe(data => {
      if(data['error']){
        console.log('Error for finding user by username', data['error'].errors);
        this.messageErrors=data['error'].errors;
      } 
      else{
        if(data['data'] == null){
          console.log('Check the spelling of username or go to the registration page: '+data['message'][0]);
          this.messageErrors=data['message'];
          console.log('message error in component.ts: '+this.messageErrors);
        } 
        else{
          console.log('success of finding an username in the db');
        this.data_User = data['data'];
        console.log(this.data_User)
        this.storage.set("username",this.data_User[0]['username']);
        this.storage.set("email", this.data_User[0]['email']);
        this.storage.set("user_id", this.data_User[0]['id']);
        this._router.navigate(['/home']);
        }
        
        
      }
    })
  }
}
