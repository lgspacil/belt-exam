import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _httpService: HttpService, private _router: Router, private _cookieService:CookieService) { 
  }

  username = {name: ''};
  clicked= null;


  submitForm(){
    this._cookieService.put('username', this.username.name);
    this.clicked = true;

    this._httpService.addNewUser(this.username)
      .then((id) => {
        console.log("we posed to the DB in componet.ts, here is the user_id: ", id);

        //we create a cookie for the person who just logged in..
        this._cookieService.put('userid', id);

        this._router.navigate(['/dashboard']);
      })

      .catch((err) => {
        console.log("unable to post User to the DB")
      })
  }

  logout(){
    this.clicked = null;
  }
  
}
