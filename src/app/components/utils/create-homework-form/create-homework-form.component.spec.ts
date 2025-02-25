import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHomeworkFormComponent } from './create-homework-form.component';

describe('CreateHomeworkFormComponent', () => {
  let component: CreateHomeworkFormComponent;
  let fixture: ComponentFixture<CreateHomeworkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHomeworkFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHomeworkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
