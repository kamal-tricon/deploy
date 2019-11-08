import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  PAN: String = '';
  allUsers: any[];
  ngOnInit() {
    // window.location.reload();
  }

  enterData(){
    console.log('function called');
    this.userService.manualEntering(true);
    this.userService.setCurrentUserId('');
    this.router.navigate(['/newUser']);
  }

  submitForm16(){
    alert('File submitted Successfully!')
  }

  findDetails(){
    this.userService.getUserDetails().subscribe((res: any[]) => {
      this.allUsers = res;
      console.log(this.allUsers)
    })
  }

  resumeFilling(id){
    this.userService.setCurrentUserId(id)
    this.router.navigate(['/newUser']);
    
    console.log(id);
  }

  removeData(id){
    console.log(id)
    this.userService.deleteData(id).subscribe((res: any) => {
      console.log(res)
      this.findDetails();
    })
  }
}
