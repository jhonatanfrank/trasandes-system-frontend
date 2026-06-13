import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsUpdateComponent } from './permissions-update.component';

describe('PermissionsUpdateComponent', () => {
  let component: PermissionsUpdateComponent;
  let fixture: ComponentFixture<PermissionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
