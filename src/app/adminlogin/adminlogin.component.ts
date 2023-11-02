import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  pattern:string = 'Admin';
  showErrorAlert:boolean = false;
  showMsg:string = '';
  constructor( private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(f:any){
    this.auth.AdminLogin(f)
    .subscribe((res:any)=>{
      if(res){
        sessionStorage.setItem('token',res.data.token);
        sessionStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/dedaebfa54a2ee5fdb3ecf1898c1ee56813d5b34']);
      }
    }, (err)=>{
      if(err){
        this.showErrorAlert= !this.showErrorAlert;
        this.showMsg="Invalid Username or Password";
      }
    })
  }
}
