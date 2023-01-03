import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockbookComponent } from './blockbook.component';

describe('BlockbookComponent', () => {
  let component: BlockbookComponent;
  let fixture: ComponentFixture<BlockbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
