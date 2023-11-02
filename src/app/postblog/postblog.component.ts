import { Component, OnInit } from '@angular/core';
import { AllblogsService } from '../services/allblogs.service';
import { QuillToolbarConfig } from 'ngx-quill';
import { Router } from '@angular/router';
import {
  faBiohazard,
  faExclamationTriangle,faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-postblog',
  templateUrl: './postblog.component.html',
  styleUrls: ['./postblog.component.css'],
})
export class PostblogComponent implements OnInit {
  selectedImage: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  blog_content: string = '';
  showLoader: boolean = false;
  showUnauthorized: boolean = false;
  showPost: boolean = true;
  getAccess: boolean = false;
  faExclamationTriangle = faExclamationTriangle;
  requestbtn: boolean = false;
  btn1: string = 'btn btn-primary mt-2';
  btn2: string = 'btn btn-secondary mt-2 disabled';
  showExist: boolean = false;
  user_id: any = '';
  userpermission: any = {};
  faPaperPlane=faPaperPlane;
  // Quill configuration
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  
  constructor(
    private blog: AllblogsService,
    private router: Router,
    private permission: PermissionsService
  ) {
    if (sessionStorage.getItem('sessionActive') != 'true') {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (
      sessionStorage.getItem('sessionActive') == 'true' &&
      sessionStorage.getItem('user_id') != null
    ) {
      this.checkUserpermission();
    } else {
      this.router.navigate(['/login']);
    }
  }

  checkUserpermission() {
    this.user_id = sessionStorage.getItem('user_id');
    this.permission.getUserpermission(this.user_id).subscribe(
      (res) => {
        this.userpermission = res;
        if (this.userpermission != null) {
          if (
            !(
              this.userpermission.access == 'true' &&
              this.userpermission.status == 'approved'
            )
          ) {
            this.showPost = !this.showPost;
            this.showUnauthorized = !this.showUnauthorized;
          }
        } else {
          this.showPost = !this.showPost;
          this.showUnauthorized = !this.showUnauthorized;
        }
      },
      (err) => {
        
      }
    );
  }

  onSelectImage(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(data: any) {
    const user_id = sessionStorage.getItem('user_id');
    const author_name = sessionStorage.getItem('user_name');
    this.showLoader = !this.showLoader;
    if (user_id && author_name) {
      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('blog_title', data.blog_title);
      formData.append('blog_content', this.blog_content);
      if (this.selectedImage) {
        formData.append(
          'image_url',
          this.selectedImage,
          this.selectedImage.name
        );
      }
      formData.append('author_name', author_name);

      this.blog.AddData(formData).subscribe((res: boolean) => {
        if (res) {
          this.showLoader = !this.showLoader;
          this.successMessage = 'Blog posted successfully.';
          this.errorMessage = '';
          setTimeout(()=>{
            this.router.navigate(['/']);
          },3000);
        } else {
          this.showLoader = !this.showLoader;
          this.errorMessage = 'Something went wrong!';
        }
      });
    } else {
      this.showLoader = !this.showLoader;
      this.successMessage = '';
      this.errorMessage = 'Authentication issues. Please log in.';
    }
  }

  onGetaccessclk() {
    this.getAccess = !this.getAccess;
  }

  onSendRequest(data: any) {
    let uid: any = sessionStorage.getItem('user_id');
    this.permission.checkExistRequest(uid).subscribe((res) => {
      if (!res) {
        let permissionRequest = new FormData();
        permissionRequest.set('user_id', uid);
        permissionRequest.set('message', data.message);
        permissionRequest.set('status', 'pending');
        permissionRequest.set('access', 'false');
        this.permission.sendRequest(permissionRequest).subscribe(
          (res) => {
            this.requestbtn = !this.requestbtn;
          },
          (err) => {
           
          }
        );
      } else {
        this.showExist = !this.showExist;
      }
    });
  }
}
