import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUser, faEdit, faArrowAltCircleRight, faArrowAltCircleLeft, faPlusSquare, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faHome = faHome;
  faUser = faUser;
  faEdit = faEdit;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  user_id:any='';
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.user_id=sessionStorage.getItem('user_id');
  }

  onLogout(){
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('sessionActive');
    this.router.navigate(['/login']);
  }

}
