import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyPartyComponent } from './notify-party.component';

describe('NotifyPartyComponent', () => {
  let component: NotifyPartyComponent;
  let fixture: ComponentFixture<NotifyPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
