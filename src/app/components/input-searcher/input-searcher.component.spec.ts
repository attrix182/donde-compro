import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSearcherComponent } from './input-searcher.component';

describe('InputSearcherComponent', () => {
  let component: InputSearcherComponent;
  let fixture: ComponentFixture<InputSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSearcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
