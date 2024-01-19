import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloService } from '@shared/service/apollo.service';
import { of } from 'rxjs';
import { RepositoriesComponent } from './repositories.component';

describe('IssueListComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoriesComponent],
      providers: [
        {
          provide: ApolloService,
          useValue: {
            query: () => of(null),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
