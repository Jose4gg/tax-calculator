import { TaxCalculatorService } from '../../services/taxCalculatorService';

describe('services', () => {
  describe('taxCalculatorService', () => {
    describe('#totalTax', () => {
      it('returns the total tax of all taxable items', () => {
        const taxCalculatorService = new TaxCalculatorService([
          '1 book at 12.49',
          '1 music CD at 14.99',
          '1 imported music CD at 14.99',
          '1 chocolate bar at 0.85',
          '1 imported chocolate bar at 0.85',
        ]);
        expect(taxCalculatorService.totalTax).toEqual(3.85);
      });
    });

    describe('#total', () => {
      it('returns the total of all taxable items', () => {
        const taxCalculatorService = new TaxCalculatorService([
          '1 book at 12.49',
          '1 music CD at 14.99',
          '1 imported music CD at 14.99',
          '1 chocolate bar at 0.85',
          '1 imported chocolate bar at 0.85',
        ]);
        expect(taxCalculatorService.total).toEqual(48.02000000000001);
      });
    });

    describe('#receipt', () => {
      it('returns the receipt of all taxable items', () => {
        const input1 = new TaxCalculatorService([
          '2 book at 12.49',
          '1 music CD at 14.99',
          '1 chocolate bar at 0.85',
        ]);

        const input2 = new TaxCalculatorService([
          '1 imported box of chocolates at 10.00',
          '1 imported bottle of perfume at 47.50',
        ]);

        const input3 = new TaxCalculatorService([
          '1 imported bottle of perfume at 27.99',
          '1 bottle of perfume at 18.99',
          '1 packet of headache pills at 9.75',
          '3 imported boxes of chocolates at 11.25',
        ]);

        expect(input1.receipt).toEqual(`2 book: 24.98
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32`);

        expect(input2.receipt).toEqual(
          `1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15`,
        );

        expect(input3.receipt).toEqual(
          `1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 imported boxes of chocolates: 35.55
Sales Taxes: 7.90
Total: 98.38`,
        );
      });
    });
  });
});
