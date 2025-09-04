import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RedirectIfAuthenticated } from "../../core/guards/redirect.guard";

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [RedirectIfAuthenticated]
  }
]
