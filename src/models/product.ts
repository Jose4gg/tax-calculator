import { EXEMPTED_LIST } from '../constants/exempted_list';
import { assert } from '../utils/assert';

export class Product {
  name: string;
  price: number;

  get exempted(): boolean {
    return !!EXEMPTED_LIST.find((exempted) => exempted.includes(this.name));
  }

  constructor(name: string, price: number) {
    assert(price >= 0, 'Price cannot be negative or NaN');

    this.name = name;
    this.price = price;
  }
}
