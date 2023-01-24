import { createInterface } from 'readline';
import { TaxCalculatorService } from './services/taxCalculatorService';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});

console.log('Hi, this is your personal tax calculator,');
console.log(`please enter follow the instructions to calculate your tax`);
console.log(`Follow this format to enter your products:\n`);
console.log(
  `[quantity:int] [imported:string?] [name_of_the_product:string] at [amount:float] \n\n`,
);

console.log(
  `Press "enter" to add more products or Press "double enter" generate the output\n`,
);

readline.prompt();

const input: string[] = [];

readline.on('line', (cmd) => {
  if (cmd === '') {
    return readline.close();
  }

  input.push(cmd);
});

readline.on('close', () => {
  const taxService = new TaxCalculatorService(input);
  console.log(taxService.generateReport());

  // TODO: Calculate the tax and print the output
  process.exit(0);
});
