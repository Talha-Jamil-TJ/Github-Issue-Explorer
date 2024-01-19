import { Injectable } from '@angular/core';
import { GET_USER } from '@shared/graphql/queries/get-user.query';
import { GetUserQuery } from '@shared/interface/generated.interface';
import { ApolloService } from '@shared/service/apollo.service';
import { finalize, map, tap } from 'rxjs';
import { TokenStore } from './toke.store';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor(private _tokenStore: TokenStore, private _apolloService: ApolloService) {}

  getUser(token: string) {
    this._tokenStore.setLoading(true);

    return this._apolloService
      .query<GetUserQuery>({
        newToken: token,
        query: GET_USER,
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
