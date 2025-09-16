import { Routes } from "@angular/router";
import { IsUserAuthenticated } from "../../core/guards/auth.guard";
import { LoginComponent } from "./pages/login/login.component";
import { ProfileComponent } from "./pages/profile/profile.component";

export const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [IsUserAuthenticated]
  },

]
