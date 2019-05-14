import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YayComponent } from './yay.component';

describe('YayComponent', () => {
  let component: YayComponent;
  let fixture: ComponentFixture<YayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
