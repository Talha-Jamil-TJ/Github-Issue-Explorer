import { Injectable } from '@angular/core';
import { VIEWER_QUERY } from '@shared/graphql/queries/viewer.query.graphql';
import { ApolloService } from '@shared/service/apollo.service';
import { finalize, map, tap } from 'rxjs';
import { TokenStore } from './toke.store';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(private _tokenStore: TokenStore, private _apolloService: ApolloService) {}

  getUser(token: string) {
    this._tokenStore.setLoading(true);

    return this._apolloService
      .client(token)
      .query({
        query: VIEWER_QUERY,
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
