import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-rho',
  templateUrl: './rho.component.html',
  styleUrls: ['./rho.component.css']
})
@Injectable()
export class RhoComponent implements OnInit {

  //we can declare the variables that we gonna use here. the variables which gonna contains the data for displaying
  selectedResearch=false;
  users = [];
  sessionVariable = {};
  messageErrors: [];
  sessions = [];
  messages = [];
  session_id: any;
  newMessage: any;
  constructor(@Inject(SESSION_STORAGE) private storage:StorageService, private _route: ActivatedRoute, private _router: Router, private _httpService: HttpService) {}// injection

  ngOnInit() {
    var today = new Date(); 
    var dd = today.getDate();
    console.log('Date: '+today);
    this.sessionVariable = sessionStorage;
    this.newMessage = {message: ''}
    this._route.params.subscribe((params: Params) => {
      this.getMessageFromService(params['id']);
      console.log("session_id in init: "+params['id'])
      this.session_id = params['id'];
    });
  }
  getMessageFromService(id){
    let observable = this._httpService.getMessages(id);
    console.log("session_id: "+id)
    observable.subscribe(data => {
      console.log('Got all messages!', data['data']);
      console.log('data: '+data['data']['created_at'])
      this.messages = data['data'];
      // this._router.navigate(['/chatroom/'+session_id]);
    });
  }

  onSubmit(){
    let observable = this._httpService.createMessage(Number(sessionStorage.user_id), this.session_id, this.newMessage);
    console.log('HERE@@@@MessageToCreation@@@@@',this.newMessage);
    observable.subscribe(data => {
      console.log("subscribe");
      if(data['Error']){
        console.log('Got a new user ERROR', data['Error']);
        this.messageErrors=data['message']
      } 
      else{
        // console.log('%%%%%AlphaComponentReturn%%%%%: ', data['data']);
        this._router.navigate(['/chatroom/'+this.session_id]);
      }
    }) 
  }
}
