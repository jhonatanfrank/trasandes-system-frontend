import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbodiesUpdateComponent } from './carbodies-update.component';

describe('CarbodiesUpdateComponent', () => {
  let component: CarbodiesUpdateComponent;
  let fixture: ComponentFixture<CarbodiesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbodiesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbodiesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
