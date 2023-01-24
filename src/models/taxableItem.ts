import { GENERAL_TAX, IMPORT_TAX } from '../constants/tax';
import { assert } from '../utils/assert';
import { Product } from './product';

export class TaxableItem {
  product: Product;
  quantity: number;
  imported: boolean;

  constructor(itemAsString: string) {
    const atSeparator = ' at ';
    const atLastIndex = itemAsString.lastIndexOf(atSeparator);

    const strBeforePrice = itemAsString.substring(0, atLastIndex);

    const priceAsString = itemAsString.substring(
      atLastIndex + atSeparator.length,
    );

    const [quantity, ...importedAndName] = strBeforePrice.split(' ');

    const imported = importedAndName[0] === 'imported';

    const name = importedAndName.slice(imported ? 1 : 0).join(' ');

    this.product = new Product(name, parseFloat(priceAsString));
    this.quantity = parseInt(quantity);
    this.imported = imported;

    assert(this.quantity > 0, 'Quantity cannot be negative or NaN');
  }

  get tax(): number {
    const generalTax = this.product.exempted
      ? 0
      : this.product.price * GENERAL_TAX;

    const importTax = this.imported ? this.product.price * IMPORT_TAX : 0;

    return (generalTax + importTax) * this.quantity;
  }

  get total(): number {
    return this.product.price * this.quantity + this.tax;
  }
}
