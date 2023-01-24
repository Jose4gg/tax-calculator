import { GENERAL_TAX, IMPORT_TAX } from '../constants/tax';
import { assert } from '../utils/assert';
import { roundToTheNearest } from '../utils/roundToTheNearest';
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

  get subtotal(): number {
    return this.product.price * this.quantity;
  }

  get tax(): number {
    let taxRate = 0;

    if (!this.product.exempted) {
      taxRate += GENERAL_TAX;
    }

    if (this.imported) {
      taxRate += IMPORT_TAX;
    }

    return (
      roundToTheNearest(this.product.price * taxRate, taxRate) * this.quantity
    );
  }

  get total(): number {
    return this.subtotal + this.tax;
  }
}
