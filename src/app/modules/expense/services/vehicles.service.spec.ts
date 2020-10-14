import { TestBed } from '@angular/core/testing';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  beforeEach(() => {
    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is customizable', () => {
    expect(service.isCustomizable(5)).toBeTruthy();
  });

  it('is not customizable', () => {
    expect(service.isCustomizable(1)).toBeFalsy();
  });
});
