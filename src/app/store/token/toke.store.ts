import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { TokenState } from '@shared/interface/token.state.interface';

const createInitialState = (): TokenState => ({
  token: '',
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'token' })
export class TokenStore extends Store<TokenState> {
  constructor() {
    super(createInitialState());
  }
}
