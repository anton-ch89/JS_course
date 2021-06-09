'use strict';


// ---------------isNumber -------------
let isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
};

// --------Проверка дохода на число---------------
let money;
let start = function () {

      do {
            money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));
};
start();
let appData = {
      income: {},
      budget: money,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      mission: 700000,
      period: 10,
      asking: function () {

            if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
                  let itemIncome = ''; 
                  do{itemIncome = prompt('Какой у Вас есть дополнительный заработок', 'Фриланс');
                  }while(isNumber(itemIncome));
                 
                  let cashIncome = 0;
                  do {cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
                  }while(!isNumber(cashIncome));
                  appData.income[itemIncome] = cashIncome;
            }
            let addExpenses = '';
            do{addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                  'Квартплата, Проездной, Кредит').trim();
            }while(isNumber(addExpenses));
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
            let val = '';
            for (let i = 0; i < 2; i++) {
                  let cell = 0;
                  cell = prompt('Введите обязательную статью расходов');

                  do {
                        val = prompt('Во сколько это обойдется?');
                  } while (!isNumber(val));
                  appData.expenses[cell] = val;
            }

      },
      //--------Проверка расходов на число---------------
      getExpensesMonth: function () {
            let sum = 0;
            for (let key in appData.expenses) {
                  sum += +appData.expenses[key];
            }
            return sum;
      },
      //--------Получение месячного бюджета---------------
      getBudget: function (money, expenses) {
            return money - expenses;
      },
      // --------Получение периода выполнения цели---------------
      getTargetMonth: function (target, monthBudget) {

            return Math.ceil(target / monthBudget);
      },
      getStatusIncome: function () {
            if (appData.budgetDay >= 1200) {
                  return ('У вас высокий уровень дохода');
            }
            else if (1200 > appData.budgetDay >= 600) {
                  return ('У вас средний уровень дохода');
            }
            else if (600 > appData.budgetDay >= 0) {
                  return ('К сожалению у вас уровень дохода ниже среднего');
            }
            else {
                  return ('Что-то пошло не так');
            }
      },
      getPeriod: function () {
            if (appData.period < 0) {
                  return 'Цель не будет достигнута';
            }
            return `Цель будет достигнута за ${appData.period} месяцев`;
      },
      getInfoDeposit: function () {
            if (appData.deposit) {
                  do {
                        appData.percentDeposit = prompt('Какой годовой процент?');
                  } while (!isNumber(appData.percentDeposit));

                  do {
                        appData.moneyDeposit = prompt('Какая сумма заложена?');
                  } while (!isNumber(appData.moneyDeposit));
            }
      },
      calcSavedMoney: function () {
            return appData.budgetMonth * appData.period;
      }
};


appData.asking();
appData.getInfoDeposit();
appData.expensesMonth = appData.getExpensesMonth();
appData.budgetMonth = appData.getBudget(money, appData.expensesMonth);
appData.period = appData.getTargetMonth(appData.mission, appData.budgetMonth);
appData.getStatusIncome();
appData.budgetDay = Math.floor(appData.budgetMonth / 30);



console.log('Обязательные расходы за месяц составляют ' + appData.expensesMonth);
console.log(appData.getPeriod());
console.log(appData.getStatusIncome());

console.log(appData.addExpenses.map(word => word.trim()[0].toUpperCase() + word.trim().substring(1)).join(', '));
for (let key in appData) {
      console.log('Наша программа включает в себя данные: ' + key, appData[key]);
}



