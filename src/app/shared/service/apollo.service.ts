import { Injectable } from '@angular/core';
import { TokenStore } from '@store/token/toke.store';
import { TokenQuery } from '@store/token/token.query';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { apolloOptionsFactory } from '../../graphql.provider';

@Injectable({ providedIn: 'root' })
export class ApolloService {
  token = this._tokenQuery.token;

  constructor(
    private _apollo: Apollo,
    private httpLink: HttpLink,
    private _tokenStore: TokenStore,
    private _tokenQuery: TokenQuery,
  ) {}

  client(newToken?: string) {
    if (newToken) {
      this._removePreviousClient();

      this._createNewClient(newToken);
    }

    return this._apollo.use(this.token());
  }

  private _removePreviousClient() {
    if (this.token() && Boolean(this._apollo.use(this.token()))) {
      this._apollo.removeClient(this.token());
    }
  }

  private _createNewClient(token: string) {
    this._apollo.createNamed(token, {
      ...apolloOptionsFactory(this.httpLink),
    });

    this._tokenStore.update({ token });
  }
}
