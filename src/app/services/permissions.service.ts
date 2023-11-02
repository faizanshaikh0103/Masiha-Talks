import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private url:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  sendRequest(request:any){
    return this.http.post(`${this.url}sendrequest`,request);
  }

  getAllpending(){
     return this.http.get(`${this.url}getallpendingrequest`);
  }

  getRequestbyId(id:string){
    return this.http.get(`${this.url}getrequestbyid/${id}`);
  }

  UpdateStatus(data:any){
    return this.http.put(`${this.url}changestatus`,data);
  }
  checkExistRequest(user_id:string){
    return this.http.get(`${this.url}checkexistrequest/${user_id}`);
  }

  getUserpermission(user_id:string){
    return this.http.get(`${this.url}getpermissionbyid/${user_id}`);
  }

  getActiveuser(){
    return this.http.get(`${this.url}getallaccepted`);
  }
}
