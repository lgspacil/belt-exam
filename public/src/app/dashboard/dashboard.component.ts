import { Component, OnInit } from '@angular/core';
import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpService } from "app/http.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name = this._cookieService.get('username');
  userid = this._cookieService.get('userid');

  list_of_polls = [];

  poll_to_del_obj = {id: null};

  constructor(private _cookieService:CookieService, private _httpService:HttpService, private _router: Router) { }

  ngOnInit() {
    this.loadPollsInDash();
  }

  loadPollsInDash(){
    this._httpService.loadPolls()
      .then((data) => {
        this.list_of_polls = data;
      })
      .catch((err) =>{
        console.log("there was an error when getting the polls in the dashboard.ts")
      })
  }

  deletePoll(poll_id){
    
    this.poll_to_del_obj.id = poll_id;
    console.log("the polls that we want to delete has an id of: and this is an object now: ", this.poll_to_del_obj);

    this._httpService.deletePoll(this.poll_to_del_obj)
      .then((data) =>{
        console.log(data);
        // this.list_of_polls = data;
        // this.loadPollsInDash();
        this.loadPollsInDash();
      })

      .catch((err) =>{
        console.log("something went wrong when deleteing the post");
        
      })
  }


}
