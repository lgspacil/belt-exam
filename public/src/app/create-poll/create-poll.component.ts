import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  name = this._cookieService.get('username');
  userid = this._cookieService.get('userid');

  constructor(private _cookieService:CookieService, private _httpService:HttpService, private _router: Router) { }

  poll_obj= {
    question: '',
    _userid: null,
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    name: ''
  }

  createPoll(){
    console.log("you clicked me!")
    this.poll_obj._userid = this.userid;
    this.poll_obj.name = this.name;

    this._httpService.postQuestion(this.poll_obj)
      .then((data) => {
        console.log("successfully posted a Poll question to the database")

         this._router.navigate(['/dashboard']);
      })

      .catch((err) => {
        console.log("did not post to the database fomr the create-poll.content.ts")
      })

  }



  ngOnInit() {
  }

}
