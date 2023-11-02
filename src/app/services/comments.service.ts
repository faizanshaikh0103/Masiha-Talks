import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }

  private url:string = environment.apiUrl;
  getCommentby(id:number){
    return this.http.get(this.url+"getcommentsby/"+id);
  }

  addComment(data:any){
    return this.http.post(this.url+'postcomment',data);
  }

  deleteComment(id:number){
    return this.http.delete(this.url+"deletecomment/"+id);
  }
}
