import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsReadComponent } from './permissions-read.component';

describe('PermissionsReadComponent', () => {
  let component: PermissionsReadComponent;
  let fixture: ComponentFixture<PermissionsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
