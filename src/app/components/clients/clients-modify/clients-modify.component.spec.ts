import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsModifyComponent } from './clients-modify.component';

describe('ClientsModifyComponent', () => {
  let component: ClientsModifyComponent;
  let fixture: ComponentFixture<ClientsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
