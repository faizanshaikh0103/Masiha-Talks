import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  baseurl:string= environment.apiUrl;
  constructor(private http:HttpClient) { }

  getUserbyId(user_id:any){
    return this.http.get(this.baseurl+'getuser/'+user_id);
  }

  updateProfileImage(data:FormData){
    return this.http.put(this.baseurl+"updateuser",data);
  }

  getAllusers(){
    return this.http.get(`${this.baseurl}getAccounts`);
  }

  deleteuser(userId:string){
    return this.http.delete(`${this.baseurl}deleteuser/${userId}`);
  }

}
