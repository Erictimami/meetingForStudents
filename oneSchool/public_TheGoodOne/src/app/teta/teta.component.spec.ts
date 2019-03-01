import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetaComponent } from './teta.component';

describe('TetaComponent', () => {
  let component: TetaComponent;
  let fixture: ComponentFixture<TetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
