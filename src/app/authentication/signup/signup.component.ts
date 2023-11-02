import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  showSuccess:boolean=false;
  showAlerterr:boolean = false;
  showMsg:string ='';
  showLoader:boolean = false;
  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  cpassword:any=false;
onSignup(data:any){
  this.showLoader = !this.showLoader;
  if(data.password === data.cpassword){
    delete data.confirmpassword;
    this.auth.existEmail(data.email)
    .subscribe((eres:boolean)=>{
      if(!eres){
        let formData = new FormData();
        formData.append('user_name',data.name);
        formData.append('email',data.email);
        formData.append('password', data.password);
        this.auth.signup(formData).subscribe((value)=>{
          if(value){
            this.showLoader = !this.showLoader;
            this.showSuccess=true;
            setTimeout(()=>{
            this.router.navigate(['/login'])}
           ,2000);
          }
          
        })
      } else {
        this.showLoader = !this.showLoader;
       this.showAlerterr=!this.showAlerterr;
       this.showMsg = "Email already exist";
      }
    })
 
} else {
  this.showLoader = !this.showLoader;
  this.cpassword = true;
}
}
}
