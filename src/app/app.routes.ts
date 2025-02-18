import { Routes } from '@angular/router';
import path from "node:path";
import {LandingComponent} from "./screens/landing/landing.component";
import {RegisterComponent} from "./screens/register/register.component";
import {LayoutComponent} from "./components/layout/layout.component";

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
    component: LayoutComponent
  }
];
