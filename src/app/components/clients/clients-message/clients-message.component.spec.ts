import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMessageComponent } from './clients-message.component';

describe('ClientsMessageComponent', () => {
  let component: ClientsMessageComponent;
  let fixture: ComponentFixture<ClientsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
