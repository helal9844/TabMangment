import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalldialogComponent } from './calldialog.component';

describe('CalldialogComponent', () => {
  let component: CalldialogComponent;
  let fixture: ComponentFixture<CalldialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalldialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
