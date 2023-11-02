import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

@Component({
  selector: 'app-viewrequest',
  templateUrl: './viewrequest.component.html',
  styleUrls: ['./viewrequest.component.css']
})
export class ViewrequestComponent implements OnInit {

  user_id:any='';
  name:string='';
  email:string='';
  status:string='';
  message:string='';
  request:any={};
  statusStyle:any={};

  constructor(private rout:ActivatedRoute, private permission:PermissionsService, private router:Router) { }

  ngOnInit(): void {
    this.getRequestbyId();
  }

  getRequestbyId(){
    this.rout.paramMap.subscribe((res)=>{
      this.user_id = res.get('uid');
      this.permission.getRequestbyId(this.user_id)
      .subscribe((response)=>{
        this.request = response;
        this.statusStyle= {
          'background-color': this.request.status == 'approved' ? 'green' : (this.request.status == 'rejected' ? 'red' : '#b2651b'),
          'color' : 'white'
        }
      }, (err)=>{
        console.log(err);
      })
    })
  }

  onAction(status:string){
  this.request.status = status;
  this.request.access = status == 'approved' ? 'true' : 'false';
   this.permission.UpdateStatus(this.request)
   .subscribe((res)=>{
    console.log(res);
    this.statusStyle= {
      'background-color': this.request.status == 'approved' ? 'green' : (this.request.status == 'rejected' ? 'red' : 'yellow'),
      'color' : 'white'
    }
   }, (err)=>{
    console.log(err);
   })
  }

}
