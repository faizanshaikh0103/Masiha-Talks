import { Component, OnInit } from '@angular/core';
import { AllblogsService } from '../services/allblogs.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { faPen } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  faPen = faPen;
  blogId?:number;
  blogs:any={};
  constructor(
    private data:AllblogsService,
    private routes:ActivatedRoute,
    private sanitizer:DomSanitizer
    ) { }

  ngOnInit(): void {
   this.getBlogview();
  }

  getBlogview(){

    this.routes.paramMap.subscribe((param:any)=>{
      this.blogId=+param.get('id');
      this.data.getDataby(this.blogId)?.subscribe((res)=>{
        this.blogs=res;
        this.blogs.formattedContent = this.sanitizeHtml(this.blogs.blog_content);
        this.Increaseview(this.blogId!);
      })
     })
    
  }

  private sanitizeHtml(html:string):SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCurrenturl(){
    return window.location.href;
  }

  Increaseview(blogId:number){
    let obj = {
      blog_id : blogId
    }
    this.data.increaseView(blogId)
    .subscribe((res)=>{
     
    }, (err)=>{
      
    })
  }
}
