import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ActiveTabclasslogin:string='nav-link active';
  ActiveTabclasssignup:string='nav-link';
  SelectedTab:string='';
  onhidelogin:boolean=false;
  onhidesignup:boolean=true;
  emailexist:any =false;
  button_text:string = 'Log in';
  showLoader:boolean = false;
  showAlerterr:boolean = false;
  showMsg:string = '';

  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }


onLogin(data:any){
  // this.spinner.show();
  this.showLoader= !this.showLoader;
  let user = {
    'email' : data.email,
    'password' : data.password
  }
   this.auth.existEmail(data.email)
  .subscribe((response:boolean)=>{
  let exist = response;
  if(exist == true){
    this.auth.login(user)
    .subscribe((res:any)=>{
      if(res.data != null){
       sessionStorage.setItem("user_id",res.data.user_id);
       sessionStorage.setItem("user_name",res.data.user_name);
       sessionStorage.setItem('sessionActive', 'true');
       }
       
      this.router.navigate(['/']);
      this.showLoader = !this.showLoader;
    }, (err)=>{
      this.showLoader = !this.showLoader;
      this.showAlerterr = !this.showAlerterr;
      this.showMsg = err.error.message+' user, Wrong password';
    })
  } else {
    this.showLoader = !this.showLoader;
    this.showAlerterr = !this.showAlerterr;
    this.showMsg = 'Wrong email and password';
  }
  })

}


}
