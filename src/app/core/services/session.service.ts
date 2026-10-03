import { computed, Service, signal } from '@angular/core';
import { Usuario } from '../models';

@Service()
export class SessionService {
  private _currentUser = signal<Usuario | null>(null);

  public currentUser = computed(() => this._currentUser());
  public isAuthenticated = computed(() => !!this._currentUser());

  login(value: Usuario): void {
    this._currentUser.set(value);
  }

  logout(): void {
    this._currentUser.set(null);
  }
}
