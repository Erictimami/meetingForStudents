import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhoComponent } from './rho.component';

describe('RhoComponent', () => {
  let component: RhoComponent;
  let fixture: ComponentFixture<RhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
