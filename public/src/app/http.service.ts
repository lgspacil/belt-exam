import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

  addNewUser(user){
    return this._http.post("/adding_user", user).map(data => data.json()).toPromise()
  }

  postQuestion(poll_obj){
    return this._http.post("/add_poll", poll_obj).map(data => data.json()).toPromise()
  }

  loadPolls(){
    return this._http.get('/all_polls').map((data) => data.json()).toPromise()
  }

  deletePoll(poll_id){
    return this._http.post('/delete_poll', poll_id).map((data) => data.json()).toPromise()
  }

  getOnePoll(id){
    return this._http.get("/poll/" + id).map(data => data.json()).toPromise()
  }


  upVote1(id){
    return this._http.post('/up_vote1', {id:id}).map((data) => data.json()).toPromise()
  }

  upVote2(id){
    return this._http.post('/up_vote2', {id:id}).map((data) => data.json()).toPromise()
  }

  upVote3(id){
    return this._http.post('/up_vote3', {id:id}).map((data) => data.json()).toPromise()
  }

  upVote4(id){
    return this._http.post('/up_vote4', {id:id}).map((data) => data.json()).toPromise()
  }

}
