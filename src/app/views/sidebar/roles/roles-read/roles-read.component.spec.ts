import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesReadComponent } from './roles-read.component';

describe('RolesReadComponent', () => {
  let component: RolesReadComponent;
  let fixture: ComponentFixture<RolesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
