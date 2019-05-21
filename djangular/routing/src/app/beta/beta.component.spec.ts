import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaComponent } from './beta.component';

describe('BetaComponent', () => {
  let component: BetaComponent;
  let fixture: ComponentFixture<BetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
