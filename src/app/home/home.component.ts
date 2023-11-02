import { Component, OnInit } from '@angular/core';
import { AllblogsService } from '../services/allblogs.service';
import { CommentsService } from '../services/comments.service';
import { forkJoin } from 'rxjs';
import {switchMap , tap, map } from 'rxjs/operators'
import { UserprofileService } from '../services/userprofile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faEye, faCrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faCrown = faCrown;
  faEye = faEye;
  blogs: any = [];
  image: any;
  nodata:boolean=false;
  showErrorMsg:string='';

  constructor(
     private data: AllblogsService,
     private comment: CommentsService,
     private userservice:UserprofileService,
     private spinner:NgxSpinnerService,
     private sanitizer:DomSanitizer
     ) { }


  ngOnInit(): void {
    this.spinner.show();
    this.data.getData().pipe(
      switchMap((blogs: any) => {
        if(blogs == null || blogs.length == 0){
          this.nodata = !this.nodata;
          this.spinner.hide();
        }
        const observables = blogs.map((blog: any) => {
          const commentObservable = this.comment.getCommentby(blog.blog_id);
          const userObservable = this.userservice.getUserbyId(blog.user_id);
          const viewCount = this.data.getViewCount(blog.blog_id);
          return forkJoin([commentObservable, userObservable, viewCount]).pipe(
            map(([comments, user, view]:any) => ({
              ...blog,  
              commentCount: comments.length,  
              user_image: user ? user.profile_image : '',
              formattedContent : this.sanitizeHTML(blog.blog_content),
              view_count : view == null ? 0 : view.view_count 
            }))
          );
        });
  
        return forkJoin(observables);
      })
    
    ).subscribe((updatedBlogs: any[]) => {
      this.blogs = updatedBlogs;
      this.spinner.hide();
    },(err)=>{
      this.showErrorMsg = "Something went wrong !!!";
      this.spinner.hide();
    });
  
  }

  private sanitizeHTML(html:string):SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
