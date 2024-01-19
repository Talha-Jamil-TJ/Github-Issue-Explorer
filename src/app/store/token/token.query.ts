import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Query } from '@datorama/akita';
import { TokenState } from '@shared/interface/token.state.interface';
import { TokenStore } from './toke.store';

@Injectable({ providedIn: 'root' })
export class TokenQuery extends Query<TokenState> {
  isLoading = toSignal(this.selectLoading());

  token = toSignal(
    this.select(({ token }) => token),
    { initialValue: '' },
  );

  constructor(private _store: TokenStore) {
    super(_store);
  }
}
