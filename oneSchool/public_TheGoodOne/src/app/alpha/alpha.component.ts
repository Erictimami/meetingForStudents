import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {SESSION_STORAGE, StorageService} from 'angular-webstorage-service';

// const username = 'username'
// const email = 'email'
// const user_id = 'user_id'

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})

@Injectable()
export class AlphaComponent implements OnInit {

  // we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  title='';
  messageErrors: [];
  data_User: any;
  newUser: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}// injection

  //this is to change
  ngOnInit() {
    this.messageErrors= [];
    this.data_User = {user_id: '', username: '', email: ''};
    this.newUser={first_name: '', last_name: '', email: '', password: '', confirmPassword: '', date_birth: '', phone: '', school: '', grade: '', gender: ''}
    console.log(sessionStorage);
  }

  onSubmit(){
    // console.log('id and newSession,', id, this.newSession);
    console.log("processing the data from form");
    if(this.newUser.password != this.newUser.confirmPassword || !this.validateEmail(this.newUser.email) ){
      console.log('HERE@@@@@@@@@RedirectRegister',this.newUser);
      this.goRegister();
    }
    //  let hash = bcrypt.hashSync('myPassword', 10);

    let observable = this._httpService.createUser(this.newUser);
    console.log('HERE@@confirmPasswordOk@@@@@@@',this.newUser);
    observable.subscribe(data => {
      console.log("subscribe");
      if(data['Error']){
        console.log('Got a new user ERROR', data['Error']);
        this.messageErrors=data['message']
      } 
      else{
        this.data_User = data['data'];
        console.log(this.data_User)
        this.storage.set("username",this.data_User[0]['username']);
        this.storage.set("email", this.data_User[0]['email']);
        this.storage.set("user_id", this.data_User[0]['id']);
        console.log(sessionStorage)

        console.log('%%%%%AlphaComponentReturn%%%%%: ', data['data']);
        this._router.navigate(['/home']);
      }
    }) 
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  

  // onSubmit_Session(id){
  //   console.log('test test');
  //   // console.log('id and newSession,', id, this.newSession);
  //   let observable = this._httpService.createSession(id, this.newSession);
  //   observable.subscribe(data => {
  //     if(data['error']){
  //       console.log('Got a new Session ERROR', data['error'].errors);
  //       this.messageErrors=data['error'].errors;
  //     } 
  //     else{
  //       this.goHome();
  //     }
  //   }) 
  // }
  // onSubmit(){
  //   // console.log('id and newSession,', id, this.newSession);
  //   let observable = this._httpService.createUserSession(this.newUser, this.newSession);
  //   console.log('HERE@@@@@@@@@',this.newSession);
  //   observable.subscribe(data => {
  //     if(data['error']){
  //       console.log('Got a new Session ERROR', data['error'].errors);
  //       this.messageErrors=data['error'].errors;
  //     } 
  //     else{
  //       this.goHome();
  //     }
  //   }) 
  // }
  goHome(){
    this._router.navigate(['/']);
  }
  goRegister(){
    this._router.navigate(['/register']);
  }
}