import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AllblogsService } from '../services/allblogs.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
@ViewChild('inpfile') inpfile? : ElementRef;


  showImage:boolean=false;
  imageurl:string = '';
  username:string = '';
  useremail:string ='';
  userId:string = '';
  password:string='';
  uid:any = 0;
  userblogs:any=[];
  onShowDialog:boolean=false;
  sessionId:any='';
  showAlert:boolean = false;
  showSuccessMsg:string = '';
  showerralert:boolean = false;
  showerrmsg:string = '';

  constructor(
     private userprofile:UserprofileService,
     private rout:ActivatedRoute,
     private blogservice:AllblogsService,
     private sanitize:DomSanitizer,
     private spinner:NgxSpinnerService,
     private router:Router
     ) {
     this.sessionId= sessionStorage.getItem('user_id');
      }

  ngOnInit(): void {
    this.spinner.show();
    this.rout.paramMap.subscribe((para:any)=>{
      this.userId = para.get('uid');
    })
    this.userprofile.getUserbyId(this.userId)
    .subscribe((res:any)=>{
      this.username=res.user_name;
      this.useremail = res.email;
      this.imageurl = res.profile_image;
      this.uid = res.id;
      this.password = res.password;
      if(this.imageurl == null || this.imageurl == ''){
        this.imageurl = 'assets/defaultimage.png';
        this.showImage = true;
      }
    })
    // get all blogs of the user
    this.getBlogsbyUser();
    // this.spinner.hide();
  }

  onClickfile(){
    this.inpfile?.nativeElement.click();
  }

  onImagechange(event:any){
    if(event.target.files){
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e:any)=>{
      this.imageurl = e.target.result;
      this.showImage=true;
    }
    }
  }
  showLoader:boolean=false;
  onUpdateProfile(data:any){
    this.showLoader = ! this.showLoader;
    let formData = new FormData();
    formData.append('uid', this.uid );
    formData.append('user_id', this.userId);
    formData.append('user_name', this.username);
    formData.append('email', this.useremail);
    formData.append('password',this.password);
    formData.append('profile_image',this.inpfile?.nativeElement.files[0]);
    this.userprofile.updateProfileImage(formData)
    .subscribe((res)=>{
     this.showSuccessMsg = 'Photo Successfuly updated.';
     this.showAlert = !this.showAlert;
     this.showLoader = ! this.showLoader;
    }, (err)=>{
      this.showerrmsg = 'Something went wront please try again!';
      this.showerralert = ! this.showerralert;
      this.showLoader = ! this.showLoader;
    })
  }

  getBlogsbyUser(){
    this.blogservice.getBlogsbyUser(this.userId)
    .subscribe((res)=>{
      this.userblogs = res;
      this.userblogs.forEach((blog:any)=>{
          blog.blog_content = this.sanitizeHtml(blog.blog_content);
      })
      this.spinner.hide();
    })
  }
  private sanitizeHtml(html:string):SafeHtml{
    return this.sanitize.bypassSecurityTrustHtml(html);
  }

  blog_id:number =0;
  onDeleteblog(bid:number){
    this.blog_id =bid;
    this.onShowDialog = !this.onShowDialog;

  }

  onConfirmation(confirm:boolean){
    this.onShowDialog = !this.onShowDialog;
    if(confirm){
      if(this.blog_id != 0){
        this.blogservice.deleteBlogByID(this.blog_id)
        .subscribe((res)=>{
          if(res){
            this.getBlogsbyUser();
          }
        })

    }
  }
}
}
