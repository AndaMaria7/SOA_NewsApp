import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailAdComponent } from './detail-ad.component';

describe('DetailAdComponent', () => {
  let component: DetailAdComponent;
  let fixture: ComponentFixture<DetailAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
