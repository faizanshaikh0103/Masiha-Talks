import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserprofileService } from '../services/userprofile.service';
import { Observable, forkJoin } from 'rxjs';
import {faTrash, faHeart} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  faHeart = faHeart;
  faTrash = faTrash;
  bid:any;
  comments:any=[];
  showNocomment:boolean=true;
  showError:boolean=false;
  errorMsg:string ='';
  onShowDialog:boolean = false;
  user_id:any = '';
  constructor(
    private comment:CommentsService,
    private routes:ActivatedRoute,
    private user:UserprofileService,

    ) { 
      this.user_id = sessionStorage.getItem('user_id');
    }

  ngOnInit(): void {
    // this.formgr = this.formbr.group({
    //   comment_content: ['']
    // })
    this.getCpmment();
  }
  getCpmment(){
   
  this.routes.paramMap.subscribe((param)=>{
    this.bid = param.get('id');
    this.comment.getCommentby(this.bid).subscribe((res:any)=>{
      this.comments=res;
      if(res.length == 0){
        this.showNocomment=true;
      } else {
        this.showNocomment= false;
        const observables = this.comments.map((com:any)=>{
          return this.user.getUserbyId(com.user_id);
        })
        forkJoin(observables).subscribe((data)=>{
          data.forEach((uprofile:any,index)=>{
            this.comments[index].user_name= uprofile ? uprofile.user_name : '';
             this.comments[index].user_image = uprofile ? uprofile.profile_image : '';
          })

        })
      }
     
    })
  })
  
  }

  onCommentpost(data:any){
   let blog_id = this.bid;
   let user_id = sessionStorage.getItem('user_id');
   if(blog_id && user_id){
    let obj = {
      "blog_id":blog_id ,
      "user_id":user_id ,
      "comment_content" : data.comment_content
    }
    this.comment.addComment(obj)
    .subscribe((res)=>{
      this.getCpmment();
      
    })
   } else {
    this.showError = !this.showError;
    this.errorMsg = "Authentication issues. Please log in.";
   }
  }
  comment_id:number=0;
  deleteComment(data:number){
      this.onShowDialog = !this.onShowDialog;
     this.comment_id = data;
  }
  onConfirmation(confirm:boolean){
    this.onShowDialog = ! this.onShowDialog;
    if(confirm){
        if(this.comment_id != 0){
          this.comment.deleteComment(this.comment_id)
          .subscribe((res)=>{
            if(res){
              this.getCpmment();
            }
          })

        }
    }
  }
  
}
