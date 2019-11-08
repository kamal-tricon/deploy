import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private httpClient: HttpClient, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  baseUrl = 'http://localhost:8081/';
  user : Object;
  userId: string = '';
  currentUserId: string = '';
  manualEnter: Boolean = false;
  loginUserInfo = {};
  headers = {};

  public addUser(ITRData: Object){
    var key = localStorage.key(0);
    console.log(typeof localStorage.getItem(key))
    this.loginUserInfo['loggedInUser'] = JSON.parse(localStorage.getItem(key));
    ITRData['loginUserInfo'] = this.loginUserInfo;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.httpClient.post('http://172.16.18.111:8081/api/add/itr', ITRData, this.headers);
    
  }


  public loginUser(user){
    this.loginUserInfo = user;
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.httpClient.post(`http://172.16.18.111:8081/api/user/register`, user, this.headers);
  }

  public saveLogin(key: string, value: Object){
    if(localStorage.length == 0){
      localStorage.setItem(key, JSON.stringify(value));
      this.storage.set(key, value);
    }    
  }

  public isLoggedInUser(){
    return localStorage.length;
  }


  public postData(itrData){
    var key = localStorage.key(0);
    itrData['loggedInUser'] = JSON.parse(localStorage.getItem(key));
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
   return this.httpClient.post('http://172.16.18.111:8081/itr/new', itrData, this.headers);
  }

  public getUserDetails(){
    let key = localStorage.key(0);
    let id = JSON.parse(localStorage.getItem(key));
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
   return this.httpClient.get('http://172.16.18.111:8081/itr/'+id.email, this.headers);
  }

  updateData(id, data: Object) {
    console.log(data);
    var key = localStorage.key(0);
    data['loggedInUser'] = JSON.parse(localStorage.getItem(key));
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
   return this.httpClient.put('http://172.16.18.111:8081/itr/update',{id: id, data: data}, this.headers);
  }


  manualEntering(flag){
    this.manualEnter = flag;
  }
  
  getUserIdAndFlag(){

    return {userId: this.userId, flag: this.manualEnter};
  }

  public deleteData(id){
    return this.httpClient.delete('http://172.16.18.111:8081/itr/delete/'+id);
  }

  public setCurrentUserId(id){
    this.manualEnter = false;
    this.userId = id;
    this.currentUserId = id;
  }

  public getCurrentUserId(){
    return this.currentUserId;
  }

  public updateDatabase(Data){
    if(this.currentUserId){
      return this.updateData(this.currentUserId, Data);
    }
    else{
      return this.postData(Data);
    }
  }
}