import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userProfile } from '../../store/auth.action';
import { selectUserProfile } from '../../store/auth.selector';
import { UserProfileResponse } from '../../types/user-profile';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  store = inject(Store);
  user$: Observable<UserProfileResponse | null> =this.store.select(selectUserProfile);

  profileFields = [
    { label: '📧 Email', value: (u: UserProfileResponse) => u.email },
    { label: '📞 Phone', value: (u: UserProfileResponse) => u.phone },
    { label: '🎂 Birth Date', value: (u: UserProfileResponse) => u.birthDate },
    { label: '⚧ Gender', value: (u: UserProfileResponse) => u.gender },
    { label: '🏠 Address', value: (u: UserProfileResponse) => `${u?.address?.city}, ${u?.address?.country}` },
    { label: '💼 Company', value: (u: UserProfileResponse) => `${u?.company?.name} — ${u?.company?.title}` },
    { label: '🎓 University', value: (u: UserProfileResponse) => u.university },
    { label: '⭐ Age', value: (u: UserProfileResponse) => u.age }
  ];

  ngOnInit() {
    this.store.dispatch(userProfile()); // აუცილებელია effect-ის გასაშვებად
  }

}
