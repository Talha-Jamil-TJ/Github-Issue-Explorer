import { Injectable } from '@angular/core';
import { TokenStore } from './toke.store';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(private _store: TokenStore) {}
}
