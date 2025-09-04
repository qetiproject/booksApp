import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  })

  authService = inject(AuthService);
  router = inject(Router);

  async onLogin() {
    try {
      const {email, password} = this.form.value;
      if(!email || !password) {
       console.log("error")
        return;
      }

      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    }
    catch(err) {
     console.error(err);
    }
  }
}
