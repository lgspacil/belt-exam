import { Component, OnInit } from '@angular/core';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpService } from "app/http.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-poll',
  templateUrl: './survey-poll.component.html',
  styleUrls: ['./survey-poll.component.css']
})
export class SurveyPollComponent implements OnInit {
  name = this._cookieService.get('username');
  userid = this._cookieService.get('userid');

  poll_id = null;
  sub = null;

  selected_poll = [];

  poll_to_vote_obj = {id: null};

  constructor(private _cookieService:CookieService, private _httpService:HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
     this.sub = this._route.params.subscribe((params) =>{
      this.poll_id = params.id
    })


    this.loadOnePoll();
  }

  loadOnePoll(){
    this._httpService.getOnePoll(this.poll_id)
      .then((data) =>{
        console.log("the data we got back in the getOneTopic is: ", data);
        this.selected_poll = data;
      })
      .catch((err) =>{
        console.log("we got an error!")
      })
  }

  upVote1(id){
    // console.log("inside survey.co: ", id)
    this._httpService.upVote1(id)
      .then((data) =>{
        console.log("we upvoted")
        this.loadOnePoll();
      })
      .catch((err) =>{
        console.log("there is an error")
      })
  }

   upVote2(id){
    // console.log("inside survey.co: ", id)
    this._httpService.upVote2(id)
      .then((data) =>{
        console.log("we upvoted")
        this.loadOnePoll();
      })
      .catch((err) =>{
        console.log("there is an error")
      })
  }

   upVote3(id){
    // console.log("inside survey.co: ", id)
    this._httpService.upVote3(id)
      .then((data) =>{
        console.log("we upvoted")
        this.loadOnePoll();
      })
      .catch((err) =>{
        console.log("there is an error")
      })
  }

   upVote4(id){
    // console.log("inside survey.co: ", id)
    this._httpService.upVote4(id)
      .then((data) =>{
        console.log("we upvoted")
        this.loadOnePoll();
      })
      .catch((err) =>{
        console.log("there is an error")
      })
  }

}
