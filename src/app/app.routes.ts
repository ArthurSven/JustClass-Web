import { Routes } from '@angular/router';
import path from "node:path";
import {LandingComponent} from "./screens/landing/landing.component";
import {RegisterComponent} from "./screens/register/register.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {HomeComponent} from "./screens/home/home.component";
import {ClassesComponent} from "./screens/classes/classes.component";
import {StudentsComponent} from "./screens/students/students.component";
import {HomeworkComponent} from "./screens/homework/homework.component";
import {PaymentsComponent} from "./screens/payments/payments.component";
import {AuthGuardService} from "./services/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'registration',
    component: RegisterComponent
  },
  {
    path: 'teacher-dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: HomeComponent },
      { path: 'class', component: ClassesComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'homework', component: HomeworkComponent },
      { path: 'payments', component: PaymentsComponent },
    ],
  }
];
