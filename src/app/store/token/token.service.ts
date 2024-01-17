import { Injectable } from '@angular/core';
import { ApolloService } from '@shared/service/apollo.service';
import { gql } from 'apollo-angular';
import { finalize, map, tap } from 'rxjs';
import { TokenStore } from './toke.store';

@Injectable({ providedIn: 'root' })
export class TokenService {
  query = gql`
    query MeQuery {
      viewer {
        login
        name
        avatarUrl
      }
    }
  `;

  constructor(private _tokenStore: TokenStore, private _apolloService: ApolloService) {}

  getUser(token: string) {
    this._tokenStore.setLoading(true);

    return this._apolloService
      .client(token)
      .query({
        query: this.query,
        context: { headers: { Authorization: `Bearer ${token}` } },
      })
      .pipe(
        tap({
          error: (err) => {
            this._tokenStore.setError(err.message);
          },
        }),
        map((res) => res.data),
        finalize(() => {
          this._tokenStore.setLoading(false);
        }),
      );
  }
}
