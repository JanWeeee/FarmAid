import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatloanComponent } from './creatloan.component';

describe('CreatloanComponent', () => {
  let component: CreatloanComponent;
  let fixture: ComponentFixture<CreatloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
