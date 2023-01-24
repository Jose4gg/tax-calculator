import { Product } from '../../models/product';

describe('models', () => {
  describe('Product', () => {
    describe('#constructor', () => {
      it('initialize successfully', () => {
        const product = new Product('book', 12.49);
        expect(product.name).toEqual('book');
        expect(product.price).toEqual(12.49);
      });

      it('throws an error if price is negative', () => {
        expect(() => new Product('book', -12.49)).toThrowError(
          'Price cannot be negative or NaN',
        );
      });

      it('throws an error if price is NaN', () => {
        expect(() => new Product('book', NaN)).toThrowError(
          'Price cannot be negative or NaN',
        );
      });
    });

    describe('#exempted', () => {
      it('returns true if the product is exempted', () => {
        const productBook = new Product('book', 12.49);
        expect(productBook.exempted).toEqual(true);

        const productMedical = new Product('packet of headache pills', 12.49);
        expect(productMedical.exempted).toEqual(true);

        const productFood = new Product('chocolate bar', 12.49);
        expect(productFood.exempted).toEqual(true);
      });

      it('returns false if the product is not exempted', () => {
        const product = new Product('music CD', 14.99);
        expect(product.exempted).toEqual(false);
      });
    });
  });
});
