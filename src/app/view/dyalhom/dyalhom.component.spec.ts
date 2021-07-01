import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyalhomComponent } from './dyalhom.component';

describe('DyalhomComponent', () => {
  let component: DyalhomComponent;
  let fixture: ComponentFixture<DyalhomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DyalhomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DyalhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
