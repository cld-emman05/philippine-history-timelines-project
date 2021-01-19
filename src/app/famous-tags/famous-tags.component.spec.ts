import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousTagsComponent } from './famous-tags.component';

describe('FamousTagsComponent', () => {
  let component: FamousTagsComponent;
  let fixture: ComponentFixture<FamousTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamousTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamousTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
