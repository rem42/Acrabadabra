import { TestBed } from '@angular/core/testing';

import { MiscellaneousExpensesService } from './miscellaneous-expenses.service';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';

describe('MiscellaneousExpensesService', () => {
  let service: MiscellaneousExpensesService;
  let misc: Miscellaneous;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonetaryService],
    }).compileComponents();
    service = TestBed.inject(MiscellaneousExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('vatDeductible(misc: Miscellaneous)', () => {
    beforeEach(() => {
      misc = new Miscellaneous('', 10, '', '', 10);
    });

    it('should return "true" if the vat is deductible on this type of miscellaneous expense', () => {
      misc.miscellaneousType = 'Repas';
      expect(service.vatDeductible(misc)).toBe(true);
    });

    it('should return "false" if the vat is non deductible on this type of miscellaneous expense', () => {
      misc.miscellaneousType = 'Transports';
      expect(service.vatDeductible(misc)).toBe(false);
    });

    it('should return "false" if the selectedtype property is undefined', () => {
      misc.miscellaneousType = undefined;
      expect(service.vatDeductible(misc)).toBe(false);
    });
  });
});
