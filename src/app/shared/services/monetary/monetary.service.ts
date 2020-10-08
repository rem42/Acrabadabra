import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonetaryService {
  constructor() {}

  static readonly VAT_RATES = { exempt: 0, greatlyReduced: 5.5, reduced: 10, normal: 20 };

  get currencyCode(): string {
    return 'EUR';
  }

  get vatRate(): number {
    return MonetaryService.VAT_RATES.normal;
  }

  static get arrayVat(): string[] {
    return Object.values(MonetaryService.VAT_RATES).map(rate => rate.toString());
  }
}
