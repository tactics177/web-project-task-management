import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskFormularComponent } from './create-task-formular.component';

describe('CreateTaskFormularComponent', () => {
  let component: CreateTaskFormularComponent;
  let fixture: ComponentFixture<CreateTaskFormularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTaskFormularComponent]
    });
    fixture = TestBed.createComponent(CreateTaskFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
