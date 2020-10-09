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
      type: 'Repas (TVA déductible)',
      vatDeductible: true,
    },
    {
      type: 'Péage (TVA déductible)',
      vat: MonetaryService.VAT_RATES.normal,
      vatDeductible: true,
    },
    {
      type: 'Transports (TVA non déductible)',
      vat: MonetaryService.VAT_RATES.reduced,
      vatDeductible: false,
    },
    {
      type: 'Hébergement (TVA non déductible)',
      vat: MonetaryService.VAT_RATES.reduced,
      vatDeductible: false,
    },
    {
      type: 'Autres (TVA déductible)',
      vatDeductible: true,
    },
    {
      type: 'Autres (TVA non déductible)',
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
