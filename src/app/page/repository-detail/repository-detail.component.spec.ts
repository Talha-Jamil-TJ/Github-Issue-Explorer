import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RepositoryDetailComponent } from './repository-detail.component';
import { RepositoryDetailQuery } from './store/repository-detail.query';
import { RepositoryDetailService } from './store/repository-detail.service';
import { RepositoryDetailStore } from './store/repository-detail.store';

describe('RepositoryDetailComponent', () => {
  let component: RepositoryDetailComponent;
  let fixture: ComponentFixture<RepositoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryDetailComponent, RouterTestingModule],
      providers: [
        RepositoryDetailQuery,
        RepositoryDetailStore,
        {
          provide: RepositoryDetailService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
