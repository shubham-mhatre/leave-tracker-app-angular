import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule,
    RouterOutlet //used routerOutlet here as layout is parent component & dashboar is it's child
    //after login we are redirecting to dashboard component while displaying navbar from layout component
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  loggedInUserData:any;

  router = inject(Router);

  constructor(){

    //to display logged in email-id in navbar.
    //retrieve user object data from localstorage & display it in html using interpolation
    const userData=localStorage.getItem('user');
    if(userData){
      this.loggedInUserData=JSON.parse(userData);
    }
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
}
