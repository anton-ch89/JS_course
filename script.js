'use strict';

let start = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetDay = document.getElementsByClassName('budget_day-value')[0];
let expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncome = document.getElementsByClassName('additional_income-value')[0];
let additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriod = document.getElementsByClassName('income_period-value')[0];
let targetMonth = document.getElementsByClassName('target_month-value')[0];
let budgetMonth = document.querySelector('.budget_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let periodSelect = document.querySelector('.period-select');
let targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');




// ---------------isNumber -------------
let isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
};

// --------Проверка дохода на число---------------

let appData = {
      budget: 0,
      budgetDay: 0,
      budgetMonth: 0,
      expensesMonth: 0,
      income: {},
      incomeMonth: 0,
      addIncome: [],
      expenses: {},
      addExpenses: [],
      deposit: false,
      percentDeposit: 0,
      moneyDeposit: 0,
      mission: 700000,
      start: function () {
            appData.budget = +salaryAmount.value;
            appData.getIncome();
            appData.getExpenses();
            
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getIncome();
            appData.getBudget();
            appData.getAddIncome();

            appData.showResult();            
      },
      disableStart: function() {
      
            if(salaryAmount.value !== ''){
                  appData.start();
            } 
            
      },
      getAddIncome: function() {
            additionalIncomeItem.forEach(item=>{
                  let itemValue = item.value.trim();
                  if(item.value !== ''){
                        appData.addIncome.push(item.value);
                  }
            });
      },
      showResult: function(){
            budgetMonth.value = appData.budgetMonth;
            budgetDay.value = appData.budgetDay;
            expensesMonth.value = appData.expensesMonth;
            additionalExpenses.value = appData.addExpenses.join(', ');
            additionalIncome.value = appData.addIncome.join(', ');
            targetMonth.value = appData.getTargetMonth();
            incomePeriod.value = appData.calcPeriod();
            periodSelect.addEventListener('change', appData.changePeriodSelect);

      },
      changePeriodSelect: function () {
            periodAmount.innerHTML = periodSelect.value;
      },
      addIncomeBlock: function() {
            let cloneIncomesItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if(incomeItems.length === 3){
                  incomePlus.style.display = 'none';
            }
      },
      getIncome: function(){
            incomeItems.forEach(items => {
                  let itemIncome = items.querySelector('.income-title').value;
                  let cashIncome = items.querySelector('.income-amount').value;
                  if(itemIncome !== '' & cashIncome !== '') {
                        appData.income[itemIncome] = cashIncome;
                  }
            });

            let sum = 0;
            for (let key in appData.income) {
                  sum += +appData.income[key];
            }
            appData.incomeMonth = sum;
      },
      addExpensesBlock: function(){
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3){
                  expensesPlus.style.display = 'none';
           }
      },
      getExpenses: function(){
            expensesItems.forEach((items) => {
                 let itemExpenses = items.querySelector('.expenses-title').value;
                 let cashExpenses = items.querySelector('.expenses-amount').value;
                 if(itemExpenses !== '' && cashExpenses !== ''){
                       appData.expenses[itemExpenses] = cashExpenses;
                 }
            });
      },
      getAddExpenses: function(){
           let addExpenses =  additionalExpensesItem.value.split(',');
           addExpenses.forEach((item) => {
                 item = item.trim();
                 if(item !== ''){
                       appData.addExpenses.push(item);
                 }
           });
      },
      //--------Сумма расходов---------------
      getExpensesMonth: function () {
            let sum = 0;
            for (let key in appData.expenses) {
                  sum += +appData.expenses[key];
            }
            appData.expensesMonth = sum;
      },
      //--------Получение месячного и дневного бюджетов---------------
      getBudget: function () {
           appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      },
      // --------Получение периода выполнения цели---------------
      getTargetMonth: function () {
            return Math.ceil(targetAmount.value / appData.budgetMonth);
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
      calcPeriod: function () {
            return periodSelect.value * appData.budgetMonth;
      },

};


start.addEventListener('click', appData.disableStart);

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
