
import { Routes } from "@angular/router";

export const authRoutes: Routes = [
   {
    path: 'login',
    loadComponent: () => 
      import('@auth-module').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => 
      import('@auth-module').then(c => c.RegisterUserComponent),
  },
   {
    path: 'send-reset-otp',
    loadComponent: () =>
        import('@auth-module').then(c => c.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () =>
        import('@auth-module').then(c => c.ResetPasswordComponent)
  },
]