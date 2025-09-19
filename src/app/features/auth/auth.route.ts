import { Routes } from "@angular/router";
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
  },

]
