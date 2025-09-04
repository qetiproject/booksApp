import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  }
]