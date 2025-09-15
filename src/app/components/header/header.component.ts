import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout, userProfile } from '../../features/auth/store/auth.action';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
   animations: [
    trigger('dropdown', [
      state('open', style({ opacity: 1, transform: 'scale(1)' })),
      state('closed', style({ opacity: 0, transform: 'scale(0.95)' })),
      transition('closed => open', [
        animate('150ms ease-out')
      ]),
      transition('open => closed', [
        animate('100ms ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
  store = inject(Store);

  onLogout() {
    this.store.dispatch(logout());
  }

  constructor() {
    this.store.dispatch(userProfile())
  }
}
