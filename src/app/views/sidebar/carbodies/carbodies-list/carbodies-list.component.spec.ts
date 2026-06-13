import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbodiesListComponent } from './carbodies-list.component';

describe('CarbodiesListComponent', () => {
  let component: CarbodiesListComponent;
  let fixture: ComponentFixture<CarbodiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarbodiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbodiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
