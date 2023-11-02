import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserprofileService } from '../services/userprofile.service';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

    users:any=[];
    onShowDialog:boolean = false;
    showdeletealert:boolean=false;
    showdelmsg:string = '';
    pendingrequest:any =[];
    activeusers:any=[];


  constructor(private router:Router, private user:UserprofileService, private request:PermissionsService) { 
    if(sessionStorage.getItem('loggedIn')!= 'true'){
      this.router.navigate(['admin']);
    }
  }

  ngOnInit(): void {
   this.getAllUsers();
   this.getPendingRequests();
   this.getActiveusers();
  }
  getAllUsers(){
    this.user.getAllusers()
    .subscribe((res:any)=>{
      this.users = res;

    }, (err)=>{
      
    })
    setTimeout(()=>{
      this.showdeletealert = false;
    }, 2000)
  }

  userId:string='';
  onDeleteUser(user_id:any){
    this.onShowDialog= !this.onShowDialog;
    this.userId = user_id;
  }

  onConfirmation(confirm:boolean){
    if(confirm){
      this.onShowDialog = !this.onShowDialog;
      if(this.userId != ''){
        this.user.deleteuser(this.userId)
        .subscribe((res)=>{
          if(res){
            this.showdeletealert = !this.showdeletealert;
            this.showdelmsg="Delete Successful";
            this.getAllUsers();
          } else {
            this.showdeletealert = !this.showdeletealert;
            this.showdelmsg="Error in Deleting the User";
          }
        })
      }
    } else {
      this.onShowDialog = !this.onShowDialog;
    }
  }

  onAdminlogout(){
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem('user_id');
    this.router.navigate(['']);
  }

  getPendingRequests(){
    this.request.getAllpending()
    .subscribe((res)=>{
      console.log(res);
      this.pendingrequest = res;
    }, (err)=>{
      console.log(err);
    })
  }

  getActiveusers(){
    this.request.getActiveuser()
    .subscribe((res)=>{
      this.activeusers = res;
      console.log("active user"+this.activeusers);
    }, (err)=>{
      console.log(err);
    })
  }

  
}
