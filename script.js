let money = 2000;
let income = 'фриланс';
let addExpenses = 'Коммуналка, Мобильная связь, Интернет, Такси, Продукты';
let deposit = true;
let mission = 10000;
let period = 10;
let budgetDay = money/30;

console.log('money: ', money);
console.log('income: ', income);
console.log('deposit: ', deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' долларов.');
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);

