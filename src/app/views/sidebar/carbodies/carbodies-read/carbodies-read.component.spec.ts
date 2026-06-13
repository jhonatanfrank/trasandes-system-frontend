import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbodiesReadComponent } from './carbodies-read.component';

describe('CarbodiesReadComponent', () => {
  let component: CarbodiesReadComponent;
  let fixture: ComponentFixture<CarbodiesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbodiesReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbodiesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
