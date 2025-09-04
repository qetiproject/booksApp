// 1. Formatting Example
// სახელის ფორმატირება პატარა + დიდი ასოებით

import { signal, computed, Component } from '@angular/core';

const firstName = signal("keti");
const lastName = signal("xecuriani");

const fullName = computed(() => {
  return firstName().toUpperCase() + " " + lastName().toLowerCase();
});

console.log(fullName()); // "KETI xecuriani"

firstName.set("Nino");
console.log(fullName()); // "NINO xecuriani"

// 2. Derived Values Example
// კალათის ჯამი (total price)

const items = signal([
  { name: 'Book', price: 10, quantity: 2 },
  { name: 'Pen', price: 5, quantity: 3 }
]);

const total = computed(() =>
  items().reduce((sum, item) => sum + item.price * item.quantity, 0)
);

console.log(total()); // 35
items.update(list => [...list, { name: 'Notebook', price: 20, quantity: 1 }]);
console.log(total()); // 55 (ავტომატურად გადათვლილი)

// 3. Lazy + Memoized Example
// ძალიან მძიმე გამოთვლა (მაგ. prime-ების დათვლა) შესრულდება მხოლოდ მაშინ, როცა ვინმე წაიკითხავს მნიშვნელობას.

function heavyCalculation(n: number): number {
  console.log("Calculating...");
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) sum += i;
  return sum;
}

const input = signal(1);
const result = computed(() => heavyCalculation(input()));

console.log("Before read");
console.log(result()); // "Calculating..." ერთხელ
console.log(result()); // მეორედ არ ითვლება, memoized

// 4. Component Example – Filtered List


// @Component({
//   selector: 'app-filter',
//   template: `
//     <input [(ngModel)]="filterText()" placeholder="Search..." />
//     <ul>
//       <li *ngFor="let user of filteredUsers()">{{ user }}</li>
//     </ul>
//   `
// })
export class FilterComponent {
  filterText = signal('');
  users = signal(['Ana', 'Nino', 'Giorgi', 'Luka']);

  filteredUsers = computed(() =>
    this.users().filter(u => u.toLowerCase().includes(this.filterText().toLowerCase()))
  );
}
// აქ filteredUsers ყოველ ჯერზე ავტომატურად ითვლება, როცა ან users შეიცვლება ან filterText.
