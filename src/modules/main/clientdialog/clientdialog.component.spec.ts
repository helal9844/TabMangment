import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdialogComponent } from './clientdialog.component';

describe('ClientdialogComponent', () => {
  let component: ClientdialogComponent;
  let fixture: ComponentFixture<ClientdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
