import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { NewLeaveComponent } from './pages/new-leave/new-leave.component';

export const routes: Routes = [
    {
        path:'',//for empty path redirect to login component
        redirectTo:"login",
        pathMatch:"full"
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',//here after login success, redirect to LayoutComponent 
        component:LayoutComponent,//& all other components are child of LayoutComponent
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'employee',
                component:EmployeeComponent
            },
            {
                path:'leave-request',
                component:NewLeaveComponent
            }
        ]
    }
];
