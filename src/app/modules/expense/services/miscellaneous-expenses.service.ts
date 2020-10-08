import { Injectable } from '@angular/core';
import { MonetaryService } from 'src/app/shared/services/monetary/monetary.service';
import { Miscellaneous } from 'src/app/shared/models/miscellaneous.model';
import { MiscellaneousType } from '../../../shared/@types/miscellaneousType';

@Injectable({
  providedIn: 'root',
})
export class MiscellaneousExpensesService {
  static readonly MISCELLANEOUS_TYPES: MiscellaneousType[] = [
    {
      type: 'Repas',
      vatDeductible: true,
    },
    {
      type: 'Péage',
      vat: MonetaryService.VAT_RATES.normal,
      vatDeductible: true,
    },
    {
      type: 'Transports',
      vat: MonetaryService.VAT_RATES.reduced,
      vatDeductible: false,
    },
    {
      type: 'Hébergement',
      vat: MonetaryService.VAT_RATES.reduced,
      vatDeductible: false,
    },
    {
      type: 'Autres',
      vatDeductible: true,
    },
    {
      type: 'Autres',
      vatDeductible: false,
    },
  ];

  vatDeductible(misc: Miscellaneous): boolean {
    if (misc.miscellaneousType === undefined) {
      return false;
    }
    const typeMisc = MiscellaneousExpensesService.MISCELLANEOUS_TYPES.find(vat => vat.type === misc.miscellaneousType);

    return typeMisc.vatDeductible;
  }
}
