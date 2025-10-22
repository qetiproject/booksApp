import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService, SafeUserData } from '@auth-module';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit{
  store = inject(Store);
  authService = inject(AuthService)
  user$!: Observable<SafeUserData>;
  
  profileFields = [
    { label: '📧 Email', value: (u: SafeUserData) => u.emailId },
    { label: '👤 Username', value: (u: SafeUserData) => u.userName },
    { label: '🏷 Full name', value: (u: SafeUserData) => u.fullName },
    { label: '🧩 Role', value: (u: SafeUserData) => u.role },
    { label: '🏠 Project', value: (u: SafeUserData) => u.projectName },
  ];
  ngOnInit() {
    const email = "keti.xecuriani@gmail.com"
    this.user$ = this.authService.searchUsers(email).pipe(
      map(response => response.data[0])
    )
  }

}