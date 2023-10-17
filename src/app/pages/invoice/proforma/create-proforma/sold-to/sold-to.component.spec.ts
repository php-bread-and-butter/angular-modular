import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldToComponent } from './sold-to.component';

describe('SoldToComponent', () => {
  let component: SoldToComponent;
  let fixture: ComponentFixture<SoldToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
