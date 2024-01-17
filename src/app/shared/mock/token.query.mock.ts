import { signal } from '@angular/core';
import { TokenQuery } from '@store/token/token.query';

export class TokenQueryMock implements Partial<TokenQuery> {
  isLoading = signal(false);

  token = signal('');
}
