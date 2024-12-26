import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './employees/login/login.component';
import { DashboardComponent } from './employees/dashboard/dashboard.component';
import { LayoutComponent } from './employees/layout/layout.component';
import { ProjectsComponent } from './employees/projects/projects.component';

export const routes: Routes = [
    
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'employees',
                component:EmployeesComponent
            },
            {
                path:'projects',
                component:ProjectsComponent
            },
           
        ]
    }
]        