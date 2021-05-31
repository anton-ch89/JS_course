'use strict';
//     Урок 2
let money = 70000;
let income = 'фриланс';
let addExpenses = 'Коммуналка, Мобильная связь, Интернет, Такси, Продукты';
let deposit = true;
let mission = 700000;
let period = 10;
let budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев.');
console.log('Цель заработать ' + mission + ' долларов.');
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);

//      Урок 3

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Квартплата, проездной, кредит');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt ('Введите обязательную статью расходов?');
let amount1 = +prompt ('Во сколько это обойдется?');
let expenses2 = prompt ('Введите обязательную статью расходов?');
let amount2 = +prompt ('Во сколько это обойдется?');
let budgetMonth  = money - (amount1 + amount2);
console.log('Бюджет на месяц: ', budgetMonth);

period = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за ' + period + ' месяцев');
budgetDay =  budgetMonth / 30;

console.log('Ваш бюджет на день: ', Math.floor(budgetDay));

if (budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
}
else if (budgetDay < 1200 && budgetDay >= 600) {
      console.log('У вас средний уровень дохода');
}
else if ( budgetDay < 600 && budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
}
else {
    console.log('Что-то пошло не так');
}



