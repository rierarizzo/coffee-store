import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsConfirmationComponent } from './clients-confirmation.component';

describe('ClientsConfirmationComponent', () => {
  let component: ClientsConfirmationComponent;
  let fixture: ComponentFixture<ClientsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
