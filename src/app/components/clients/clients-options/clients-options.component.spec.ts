import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsOptionsComponent } from './clients-options.component';

describe('ClientsOptionsComponent', () => {
  let component: ClientsOptionsComponent;
  let fixture: ComponentFixture<ClientsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
