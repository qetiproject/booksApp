import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, SafeUserData } from '@auth-module';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

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
  private route = inject(ActivatedRoute);

  profileFields = [
    { label: '📧 Email', value: (u: SafeUserData) => u.emailId },
    { label: '👤 Username', value: (u: SafeUserData) => u.userName },
    { label: '🏷 Full name', value: (u: SafeUserData) => u.fullName },
    { label: '🧩 Role', value: (u: SafeUserData) => u.role },
    { label: '🏠 Project', value: (u: SafeUserData) => u.projectName },
  ];

  ngOnInit() {
    this.user$ = of(this.route.snapshot.data['user'].data[0]);
  }

}