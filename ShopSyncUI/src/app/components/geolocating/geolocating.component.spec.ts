import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocatingComponent } from './geolocating.component';

describe('GeolocatingComponent', () => {
  let component: GeolocatingComponent;
  let fixture: ComponentFixture<GeolocatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeolocatingComponent]
    });
    fixture = TestBed.createComponent(GeolocatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
