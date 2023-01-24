import { TaxableItem } from '../models/taxableItem';

export class TaxCalculatorService {
  items: TaxableItem[];

  constructor(itemsAsString: string[]) {
    this.items = itemsAsString.map(
      (itemAsString) => new TaxableItem(itemAsString),
    );
  }

  get totalTax(): number {
    return this.items.reduce((acc, item) => acc + item.tax, 0);
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }

  get receipt(): string {
    const itemsAsString = this.items
      .map(
        (item) =>
          `${item.quantity} ${item.imported ? 'imported ' : ''}${
            item.product.name
          }: ${item.total.toFixed(2)}`,
      )
      .join('\n');

    return `${itemsAsString}\nSales Taxes: ${this.totalTax.toFixed(
      2,
    )}\nTotal: ${this.total.toFixed(2)}`;
  }
}
