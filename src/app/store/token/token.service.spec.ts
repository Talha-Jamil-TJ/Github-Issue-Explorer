import { TestBed } from '@angular/core/testing';
import { ApolloQueryResult, QueryOptions } from '@apollo/client';
import { TokenStoreMock } from '@mock/token.store.mock';
import { ApolloService } from '@shared/service/apollo.service';
import { BehaviorSubject } from 'rxjs';
import { TokenStore } from './toke.store';
import { TokenService } from './token.service';
import spyOn = jest.spyOn;

describe('TokenService', () => {
  let service: TokenService;

  let tokenStore: TokenStore;
  let apolloService: ApolloService;

  let queryEmitter$: BehaviorSubject<ApolloQueryResult<unknown>>;

  const mockToken = 'Mock Token';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: TokenStore,
          useClass: TokenStoreMock,
        },
        {
          provide: ApolloService,
          useValue: {
            query: (params: QueryOptions<unknown, unknown>) => {
              queryEmitter$ = new BehaviorSubject<ApolloQueryResult<unknown>>(params as never);

              return queryEmitter$;
            },
          },
        },
      ],
    }).compileComponents();

    service = TestBed.inject(TokenService);
    tokenStore = TestBed.inject(TokenStore);
    apolloService = TestBed.inject(ApolloService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should call setLoading in tokenStore when getUser() is called', () => {
    const spy = spyOn(tokenStore, 'setLoading');

    service.getUser(mockToken).subscribe();

    queryEmitter$.next({ data: null } as never);
    queryEmitter$.complete();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenNthCalledWith(1, true);
    expect(spy).toHaveBeenNthCalledWith(2, false);
  });

  it('should call client() in apolloService when getUser() is called', () => {
    const spy = spyOn(apolloService, 'query');

    service.getUser(mockToken);

    expect(spy).toHaveBeenCalled();
  });

  it('should call setError() in tokenStore when getUser() is called and query observable throws an error', () => {
    const spy = spyOn(tokenStore, 'setError');
    const someError = 'Some Error';

    service.getUser(mockToken).subscribe();

    queryEmitter$.error({ message: someError });

    expect(spy).toHaveBeenCalledWith(someError);
  });

  afterAll(() => {
    queryEmitter$.complete();
  });
});
