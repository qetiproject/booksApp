import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { MessagesService } from '@core/services/messages.service';
import { Store } from '@ngrx/store';
import { AuthService } from 'modules/auth-module/services/auth.service';
import { RegisterUserRequest } from 'modules/auth-module/types/user';

@Component({
    selector: 'register-user',
    standalone: true,
    imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
    templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  messages = inject(MessagesService);
  store = inject(Store);
  @ViewChild(FormGroupDirective, { static: false }) private formDir!: FormGroupDirective;
  
  form = this.fb.group({
    emailId: [],
    fullName: [],
    password: []
  })
  
  onSubmit(e: Event): void {
    // const credentials: RegisterUserRequest = {
    //   userId: Math.floor(Math.random() * 1000000),
    //   emailId: "keti@gmail.com",
    //   fullName: "keti Khetsuriani",
    //   password: "password"
    // }
    const credentials: RegisterUserRequest = {
      emailId: this.form.value.emailId!,
      fullName: this.form.value.fullName!,
      password: this.form.value.password!,
      userId: Math.floor(Math.random() * 1000000),
    }
    
    console.log(credentials, "credentials")
    this.authService.registerUser(credentials).subscribe({
      next: (user) => console.log(user, "user")
    })
  }


}
