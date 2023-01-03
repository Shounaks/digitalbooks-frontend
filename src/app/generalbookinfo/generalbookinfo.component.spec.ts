import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralbookinfoComponent } from './generalbookinfo.component';

describe('GeneralbookinfoComponent', () => {
  let component: GeneralbookinfoComponent;
  let fixture: ComponentFixture<GeneralbookinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralbookinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralbookinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
