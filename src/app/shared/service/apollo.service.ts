import { Injectable } from '@angular/core';
import { TokenStore } from '@store/token/toke.store';
import { TokenQuery } from '@store/token/token.query';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { apolloOptionsFactory } from '../../graphql.provider';

@Injectable({ providedIn: 'root' })
export class ApolloService {
  constructor(
    private _apollo: Apollo,
    private httpLink: HttpLink,
    private _tokenStore: TokenStore,
    private _tokenQuery: TokenQuery,
  ) {}

  client(newToken?: string) {
    if (newToken) {
      const prevToken = this._tokenQuery.token();

      if (prevToken && Boolean(this._apollo.use(prevToken))) {
        this._apollo.removeClient(prevToken);
      }

      this._apollo.createNamed(newToken, apolloOptionsFactory(this.httpLink));

      this._tokenStore.update({ token: newToken });
    }

    return this._apollo.use(this._tokenQuery.token());
  }
}
