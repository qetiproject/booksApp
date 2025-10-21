import { Component } from '@angular/core';
import { SendResetOtpComponent } from './components/send-reset-otp/send-reset-otp.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    SendResetOtpComponent
],
  templateUrl: './forget-password.component.html',
})
export class ForgotPasswordComponent  {
}
