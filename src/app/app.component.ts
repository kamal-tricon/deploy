import {Router} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";
import { AuthService, GoogleLoginProvider } from 'angular4-social-login';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  user: Object;
  isLoggedIn: Boolean = false;
  constructor(private router: Router, private userService: UserService, private _socioAuthServ: AuthService){

  }
  title = 'web-app';
  isClicked: Boolean = false;

  ngOnInit(){
    var loggedIn = this.userService.isLoggedInUser();
    if(loggedIn != 0){
      var key = localStorage.key(0);
      this.user = JSON.parse(localStorage.getItem(key));
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }
    else{
      var key1 = localStorage.key(0);
      
    }
  }

  login(){
    this.isClicked = true;
    this.router.navigate(['/home']);
   console.log('login is called')
  }


  signIn(platform : string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._socioAuthServ.signIn(platform).then(
      (response) => {
        console.log(platform + " logged in user data is = " , response);
        
        this.user = {
          email: response.email,
          name: response.name,
          photoUrl: response.photoUrl
        }
        this.login();
        this.userService.saveLogin(response.email, this.user);
        this.userService.loginUser(this.user).subscribe((res: any[]) => {
          
          console.log(res)
        })
      }
    );
  }

  signOut(platform: string){

    localStorage.clear();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
    // platform = GoogleLoginProvider.PROVIDER_ID;
    // this._socioAuthServ.signOut().then((response) => {

    // })
  }
}
