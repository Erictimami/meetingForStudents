import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private _http: HttpClient) {  
  }
  //get all the users or the sessions
  getUsers(){
    return this._http.get('/route/users');
  }
  getSessions(){
    return this._http.get('/route/sessions');
  }
  getSessions_2(){
    return this._http.get('/route/sessions_2');
  }
  //find a specific user or session
  getOneUser(id){
    return this._http.get('/route/users/'+id);
  }
  getOneUserByUsername(newLogin){
    console.log('newLog in service.ts : '+newLogin.password);
    return this._http.post('/route/users/username/'+newLogin.username, newLogin);
  }
  getOneSession(id){
    return this._http.get('/route/sessions/'+id);
  }
  getMySessions(id){
    return this._http.get('/route/mySessions/'+id)
  }
  getUsers_in_Sessions(){
    return this._http.get('/route/users_in_sessions');
  }
  getRequests(user_id){
    return this._http.get('/route/requests/'+user_id);
  }
  //create a user or a session
  createUser(newUser){
    console.log("service.ts: "+newUser);
    return this._http.post('/route/', newUser);
  }
  createSession(id, newSession){
    console.log("Here in service.ts processing creation session: "+newSession +" id = "+id);
    return this._http.post('/route/sessions/'+id, newSession);
  }
  createMessage(id, session_id, newMessage){
    console.log("Here in service.ts processing creation Message: "+newMessage +" user_id = "+id+" session_id = "+session_id);
    return this._http.post('/route/messages/'+id+'/'+session_id, newMessage);
  }
  getMessages(session_id){
    console.log("Here in service.ts processing Getting Messages session_id = "+session_id);
    return this._http.get('/route/messages/'+session_id);
  }
  //update
  updateUser(id, newUser){
    return this._http.put('/route/user/'+id, newUser);
  }
  updateSession(id, newSession){
    console.log('session_id: '+id+' newSession: '+newSession);
    return this._http.put('/route/sessions/'+id, newSession);
  }
  leaveSession(id, session_id){
    console.log("id of user in service.ts: "+id);
    console.log('user_id: '+id+' session_id: '+session_id);
    return this._http.delete('/route/leaveSession/'+id+'/'+session_id);
  }
  askSession(id, session_id){
    console.log("id of user in service.ts: "+id);
    console.log('user_id: '+id+' session_id: '+session_id);
    return this._http.post('/route/requestToSession', {User_id: id, Session_id: session_id, user_status: false});
  }
  AcceptSession(id, session_id){
    console.log("id of user in service.ts: "+id);
    console.log('user_id: '+id+' session_id: '+session_id);
    return this._http.post('/route/acceptToSession', {User_id: id, Session_id: session_id, user_status: false});
  }
  acceptRequest(id, session_id){
    console.log("id of user in service.ts: "+id);
    console.log('user_id: '+id+' session_id: '+session_id);
    return this._http.put('/route/acceptRequest', {User_id: id, Session_id: session_id, user_status: true});
  }
  //delete
  deleteUser(id){
    return this._http.delete('/route/users/'+id);
  }
  deleteSession(id, session_id){
    console.log("id of session in service.ts: "+session_id);
    return this._http.delete('/route/removeSession/'+id+'/'+session_id);
  }

}
