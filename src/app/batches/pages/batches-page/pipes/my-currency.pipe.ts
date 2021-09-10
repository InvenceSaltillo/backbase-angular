import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCurrency'
})
export class MyCurrencyPipe implements PipeTransform {

  transform(currency: string): string {

    switch (currency) {
      case 'dolar':
        currency = 'USD';
        break;
        case 'euro':
          currency = 'EUR';
          break;
          case 'colon':
            currency = 'CRC';
            break;

      default:
        break;
    }
    return currency;
  }

}
