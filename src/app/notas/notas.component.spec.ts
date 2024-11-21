import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotasComponent } from './notas.component';

describe('NotasComponent', () => {
  let component: NotasComponent;
  let fixture: ComponentFixture<NotasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NotasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
