'use strict';


// ---------------isNumber -------------
let isNumber = function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
};
//------------------------------------------

let money;
let income = 'фриланс';
let addExpenses = 'Коммуналка, Мобильная связь, Интернет, Такси, Продукты';
let deposit = true;
let mission = 700000;
let period = 10;
let budgetDay;
let expenses = [];

// --------Проверка дохода на число---------------
let start = function() {

      do{
      money = prompt('Ваш месячный доход?');
      } while (!isNumber(money)); 
};
start();


addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
    'Квартплата, Проездной, Кредит');
deposit = confirm('Есть ли у вас депозит в банке?');

// --------Проверка расходов на число---------------

let getExpensesMonth = function () {
      let sum= 0; 
      let val ='';

      for (let i = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов');
            do{
            val = prompt ('Во сколько это обойдется?');
            sum += +val; 
            } while(!isNumber(val));
      }
      return sum;
};
let expensesAmount = getExpensesMonth();

// --------Получение статуса дохода---------------

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

// --------Получение месячного бюджета---------------
const getAccumulatedMonth = function (money, expenses) {
      return money - expenses;
}; 
const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

// --------Получение периода выполнения цели---------------
const getTargetMonth = function (mission, monthBudget) {
 
      return  Math.ceil(mission / monthBudget); 
};

period = getTargetMonth(mission, accumulatedMonth);

let getPeriod = function () {
      if (period < 0) {
            return 'Цель не будет достигнута'; 
      }
      return `Цель будет достигнута за ${period} месяцев`;
};

// --------Получение типа данных---------------

const getTypeOf = function(data) {
      console.log(data, typeof(data));
};


budgetDay = Math.floor(accumulatedMonth / 30);

// --------Вывод данных---------------
getTypeOf(money);
getTypeOf(income);
getTypeOf(deposit);

console.log('Обязательные расходы за месяц составляют ' + expensesAmount);
console.log('Перечень возможных расходов: ', addExpenses.toLowerCase().split(','));
console.log(getPeriod());
console.log('Ваш бюджет на день: ', budgetDay);
console.log(getStatusIncome());