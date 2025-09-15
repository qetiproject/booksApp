import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userProfile } from '../../store/auth.action';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  store = inject(Store);
  user$: Observable<any> = this.store.select(userProfile)
}
