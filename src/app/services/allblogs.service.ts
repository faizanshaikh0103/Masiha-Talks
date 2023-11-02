import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllblogsService {

  private url:string = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getData(){
    return this.http.get(this.url+"getbloglist");
  }
  getDataby(id:any){
    let bid:number = parseInt(id);
    if(!isNaN(bid)){
    return this.http.get(this.url+"blogbyid/"+bid);
    } else {
      return null;
    }
  }
  AddData(formData:FormData):Observable<boolean>{
    return this.http.post<boolean>(this.url+'postblog',formData);
  }

  getBlogsbyUser(userId:any){
    return this.http.get(`${this.url}userblogs/${userId}`);
  }
  
  deleteBlogByID(id:number){
    return this.http.delete(`${this.url}deleteblog/`+id);
  }

  increaseView(obj:number){
    return this.http.post(`${this.url}increaseCount`,obj);
  }

  getViewCount(blogId:number){
    return this.http.get(`${this.url}viewcount/${blogId}`);
  }
}
