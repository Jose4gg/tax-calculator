import { TaxableItem } from '../../models/taxableItem';

describe('models', () => {
  describe('Product', () => {
    describe('#constructor', () => {
      it('initialize successfully', () => {
        const taxableItem = new TaxableItem('23 book at 12.49');
        expect(taxableItem.product.name).toEqual('book');
        expect(taxableItem.product.price).toEqual(12.49);
        expect(taxableItem.quantity).toEqual(23);
        expect(taxableItem.imported).toEqual(false);
      });

      it('throws an error if quantity is negative', () => {
        expect(() => new TaxableItem('-1 book at 12.49')).toThrowError(
          'Quantity cannot be negative or NaN',
        );
      });

      it('throws an error if quantity is NaN', () => {
        expect(() => new TaxableItem('AB book at 12.49')).toThrowError(
          'Quantity cannot be negative or NaN',
        );
      });

      it('initialize successfully with imported', () => {
        const taxableItem = new TaxableItem('12 imported book at 12.49');
        expect(taxableItem.product.name).toEqual('book');
        expect(taxableItem.product.price).toEqual(12.49);
        expect(taxableItem.quantity).toEqual(12);
        expect(taxableItem.imported).toEqual(true);
      });
    });

    describe('#tax', () => {
      describe('when the product is exempted', () => {
        describe('when the product is imported', () => {
          it('returns 5% tax', () => {
            const taxableItem = new TaxableItem('2 imported book at 10');
            expect(taxableItem.tax).toEqual(1);
          });
        });

        describe('when the product is not imported', () => {
          it('returns 0% tax', () => {
            const taxableItem = new TaxableItem('1 book at 12.49');
            expect(taxableItem.tax).toEqual(0);
          });
        });
      });

      describe('when the product is not exempted', () => {
        describe('when the product is imported', () => {
          it('returns 15% tax', () => {
            const taxableItem = new TaxableItem(
              '1 imported bottle of perfume at 47.50',
            );
            expect(taxableItem.tax).toEqual(7.15);
          });
        });

        describe('when the product is not imported', () => {
          it('returns 10% tax', () => {
            const taxableItem = new TaxableItem('1 bottle of perfume at 18.99');
            expect(taxableItem.tax).toEqual(1.9);
          });
        });
      });
    });

    describe('#total', () => {
      describe('when the product is exempted', () => {
        describe('when the product is imported', () => {
          it('returns the total price of the taxable item', () => {
            const taxableItem = new TaxableItem('2 imported book at 10');
            expect(taxableItem.total).toEqual(21);
          });
        });

        describe('when the product is not imported', () => {
          it('returns the total price of the taxable item', () => {
            const taxableItem = new TaxableItem('1 book at 12.49');
            expect(taxableItem.total).toEqual(12.49);
          });
        });
      });

      describe('when the product is not exempted', () => {
        describe('when the product is imported', () => {
          it('returns the total price of the taxable item', () => {
            const taxableItem = new TaxableItem(
              '1 imported bottle of perfume at 47.50',
            );
            expect(taxableItem.total).toEqual(54.65);
          });
        });

        describe('when the product is not imported', () => {
          it('returns the total price of the taxable item', () => {
            const taxableItem = new TaxableItem('1 bottle of perfume at 18.99');
            expect(taxableItem.total).toEqual(20.889999999999997);
          });
        });
      });
    });
  });
});
