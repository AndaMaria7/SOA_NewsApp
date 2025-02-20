import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineAdComponent } from './line-ad.component';

describe('LineAdComponent', () => {
  let component: LineAdComponent;
  let fixture: ComponentFixture<LineAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineAdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LineAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
