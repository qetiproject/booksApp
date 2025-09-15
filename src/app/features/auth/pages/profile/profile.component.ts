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
  user$: Observable<{user: UserProfileResponse}> =this.store.select(selectUserProfile)
  
  ngOnInit() {
    this.store.dispatch(userProfile()); // აუცილებელია effect-ის გასაშვებად
  }

}
