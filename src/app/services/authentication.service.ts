import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  signup(data:any):Observable<boolean>{
    data.profile_image = "defaoul image";
    return this.http.post<boolean>(this.url+"signup",data);
  }
  existEmail(email:any):Observable<boolean>{
    return this.http.get<boolean>(this.url+"checkexist/"+email);
  }

  login(user:any):Observable<any>{
    return this.http.post<any>(this.url+"login",user);
  }

  AdminLogin(data:any){
    return this.http.post(`${this.url}adminlogin`,data);
  }
}
