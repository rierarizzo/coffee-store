import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersModifyComponent } from './users-modify.component';

describe('UsersCreateComponent', () => {
  let component: UsersModifyComponent;
  let fixture: ComponentFixture<UsersModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
