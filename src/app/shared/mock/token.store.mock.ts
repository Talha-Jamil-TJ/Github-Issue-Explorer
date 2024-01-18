import { TokenStore } from '@store/token/toke.store';

export class TokenStoreMock implements Partial<TokenStore> {
  isLoading!: boolean;
  error: unknown;

  setLoading(loading?: boolean) {
    this.isLoading = loading ?? false;
  }

  setError<T>(error: T) {
    this.error = error;
  }
}
