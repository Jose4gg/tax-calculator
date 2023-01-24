import { EXEMPTED_LIST } from '../constants/exempted_list';

export class Product {
  name: string;

  get imported(): boolean {
    return this.name.startsWith('imported');
  }

  get exempted(): boolean {
    return !!EXEMPTED_LIST.find((exempted) => exempted.includes(this.name));
  }

  constructor(name: string) {
    this.name = name;
  }
}
