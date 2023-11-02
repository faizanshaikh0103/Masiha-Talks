import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SuccessComponent } from './success/success.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PostblogComponent } from './postblog/postblog.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentsComponent } from './comments/comments.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ViewrequestComponent } from './viewrequest/viewrequest.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'view/:id', component:ViewComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'success', component:SuccessComponent},
  {path:'create', component:PostblogComponent},
  {path:'signup', component:SignupComponent},
  {path:'uprofile/:uid', pathMatch:'full', component:ProfileComponent},
  {path: 'comments', component : CommentsComponent},
  {path: 'admin' , component: AdminloginComponent},
  {path: 'dedaebfa54a2ee5fdb3ecf1898c1ee56813d5b34', component: AdminpageComponent},
  {path: 'requestview/:uid', component:ViewrequestComponent},
  {path:'**',pathMatch:'full', component:NotfoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
