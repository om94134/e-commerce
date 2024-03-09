import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetdetailsComponent } from './cetdetails.component';

describe('CetdetailsComponent', () => {
  let component: CetdetailsComponent;
  let fixture: ComponentFixture<CetdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CetdetailsComponent]
    });
    fixture = TestBed.createComponent(CetdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
