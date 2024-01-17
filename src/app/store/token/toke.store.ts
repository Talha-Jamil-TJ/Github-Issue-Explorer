import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ITokenState } from '@shared/interface/token.state.interface';

const createInitialState = (): ITokenState => ({
  token: '',
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'token' })
export class TokenStore extends Store<ITokenState> {
  constructor() {
    super(createInitialState());
  }
}
