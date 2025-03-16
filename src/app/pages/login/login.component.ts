import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginObject:any={
    userName:'',
    password:''
  }
  
  http = inject(HttpClient);
  router=inject(Router);

  onLogin(){

    let res={
      "message": "User Found",
      "result": true,
      "data": {
          "employeeId": 1,
          "employeeName": this.loginObject.userName,
          "contactNo": "112233",
          "emailId": this.loginObject.userName,
          "deptId": 1,
          "password": this.loginObject.password,
          "gender": "Male",
          "role": "Admin",
          "createdDate": "2025-03-14T00:00:00"
        }
    }

    console.log(res.data);
    localStorage.setItem('user',JSON.stringify(res.data));
    this.router.navigateByUrl('dashboard');
    
    //to be dynamic like this with http call
    // this.http.post(
    //   'url',
    //   this.loginObject
    // ).subscribe((res:any)=>{
    //   console.log(res);
    //   if(res.result){
    //     localStorage.setItem('user',JSON.stringify(res.data));
    //     this.router.navigateByUrl('dashboard');
    //   }else{
    //     alert(res.message);
    //   }
    // });
    
  }
}
