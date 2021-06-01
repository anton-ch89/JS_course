'use strict';
//     Урок 2
let money = 70000;
let income = 'фриланс';
let addExpenses = 'Коммуналка, Мобильная связь, Интернет, Такси, Продукты';
let deposit = true;
let mission = 700000;
let period = 10;
let budgetDay = money / 30;


//      Урок 3

money = +prompt('Ваш месячный доход?', 30000);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Квартплата, проездной, кредит');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt ('Введите обязательную статью расходов?');
let amount1 = +prompt ('Во сколько это обойдется?', 1000);
let expenses2 = prompt ('Введите обязательную статью расходов?');
let amount2 = +prompt ('Во сколько это обойдется?', 2000);

const getStatusIncome = function () {
      if (budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
      }
      else if (budgetDay < 1200 && budgetDay >= 600) {
            return ('У вас средний уровень дохода');
      }
      else if ( budgetDay < 600 && budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
      }
      else {
          return ('Что-то пошло не так');
      }
};


//    Урок 4


const getExpensesMonth = function (exp1, exp2) {
       return exp1 + exp2;
};

const getAccumulatedMonth = function (money, expenses) {
      return money - expenses;
}; 

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

const getTargetMonth = function (mission, monthBudget) {
        return Math.ceil(mission / monthBudget);
};

const getTypeOf = function(data) {
      console.log(data, typeof(data));
};

getTypeOf(money);
getTypeOf(income);
getTypeOf(deposit);
budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Обязательные расходы за месяц составляют ' + getExpensesMonth(amount1, amount2));
console.log('Перечень возможных расходов: ', addExpenses);
console.log('Срок достижения цели составлят ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
console.log('Ваш бюджет на день: ', budgetDay);
console.log(getStatusIncome());
