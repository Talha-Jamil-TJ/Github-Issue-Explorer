import { Injectable } from '@angular/core';
import type { ApolloQueryResult, QueryOptions } from '@apollo/client/core';
import { TokenStore } from '@store/token/toke.store';
import { TokenQuery } from '@store/token/token.query';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import type { EmptyObject } from 'apollo-angular/types';
import { Observable } from 'rxjs';
import { apolloOptionsFactory } from '../../graphql.provider';

@Injectable({ providedIn: 'root' })
export class ApolloService {
  constructor(
    private _apollo: Apollo,
    private httpLink: HttpLink,
    private _tokenStore: TokenStore,
    private _tokenQuery: TokenQuery,
  ) {}

  query<T, V = EmptyObject>({
    newToken,
    ...options
  }: QueryOptions<V, T> & { newToken?: string }): Observable<ApolloQueryResult<T>> {
    if (newToken) {
      const prevToken = this._tokenQuery.token();

      if (prevToken && Boolean(this._apollo.use(prevToken))) {
        this._apollo.removeClient(prevToken);
      }

      this._apollo.createNamed(newToken, apolloOptionsFactory(this.httpLink));

      this._tokenStore.update({ token: newToken });
    }

    return this._apollo.use(this._tokenQuery.token()).query({
      ...options,
      context: {
        ...options.context,
        headers: {
          ...options.context?.['headers'],
          Authorization: `Bearer ${this._tokenQuery.token()}`,
        },
      },
    });
  }
}
