import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbodiesCreateComponent } from './carbodies-create.component';

describe('CarbodiesCreateComponent', () => {
  let component: CarbodiesCreateComponent;
  let fixture: ComponentFixture<CarbodiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbodiesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbodiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
