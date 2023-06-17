import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeComponent } from './list-mode.component';

describe('ListModeComponent', () => {
  let component: ListModeComponent;
  let fixture: ComponentFixture<ListModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
