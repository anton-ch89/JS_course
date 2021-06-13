'use strict';

let start = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let checkBox = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let budgetMonthValue = document.querySelector('.budget_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('div.income-items  > .income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('div.expenses-items>.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let periodSelect = document.querySelector('.period-select');
let targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let cancel = document.querySelector('#cancel');

// ---------------isNumber -------------
let isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
};


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
      start: function () {
            this.budget = +salaryAmount.value;
            this.getIncome();
            this.getExpenses();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getIncome();
            this.getBudget();
            this.getAddIncome();
            this.showResult();

            start.setAttribute('disabled', true);
            start.style.display = 'none';
            cancel.style.display = 'block';
            cancel.removeAttribute('wfd-invisible');

            incomePlus.setAttribute('disabled', true);
            expensesPlus.setAttribute('disabled', true);
            checkBox.setAttribute('disabled', true);


            let inputs = document.querySelectorAll('input[type=text]');
            inputs.forEach(i => {
                  i.setAttribute('disabled', true);
            });

      },
      disableStart: function () {
            if (!isNumber(salaryAmount.value) || +salaryAmount.value === 0 || salaryAmount === '') {
                  start.setAttribute('disabled', true);
            } else { start.removeAttribute('disabled'); }
      },

      reset: function () {
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.percentDeposit = 0;
            this.moneyDeposit = 0;

            incomePeriodValue.value = 0;
            periodSelect.value = 1;
            periodAmount.textContent = '1';

            cancel.style.display = 'none';
            start.style.display = 'block';
            start.removeAttribute('disabled');

            incomePlus.removeAttribute('disabled');
            expensesPlus.removeAttribute('disabled');
            checkBox.removeAttribute('disabled');

            let inputs = document.querySelectorAll('input[type=text]');
            inputs.forEach(i => {
                  i.removeAttribute('disabled');
                  i.value = '';
            });
            expensesItems.forEach((item, i) => {
                  if (i !== 0) {
                        expensesItems[i].remove();
                        expensesPlus.style.display = 'block';
                  }
            });
            incomeItems.forEach((item, i) => {
                  if (i !== 0) {
                        incomeItems[i].remove();
                        incomePlus.style.display = 'block';
                  }
            });
      },

      getAddIncome: function () {
            additionalIncomeItem.forEach(item => {
                  let itemValue = item.value.trim();
                  if (item.value !== '') {
                        this.addIncome.push(item.value);
                  }
            });
      },

      showResult: function () {
            const _this = this;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            budgetMonthValue.value = this.budgetMonth;
            incomePeriodValue.value = this.calcPeriod();
            periodSelect.addEventListener('change', function () {
                  incomePeriodValue.value = _this.calcPeriod();
            });
      },

      changePeriodSelect: function () {
            periodAmount.innerHTML = periodSelect.value;
      },

      addIncomeBlock: function () {
            let cloneIncomesItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                  incomePlus.style.display = 'none';
            }
      },

      getIncome: function () {
            incomeItems.forEach(items => {
                  let itemIncome = items.querySelector('.income-title').value;
                  let cashIncome = items.querySelector('.income-amount').value;
                  if (itemIncome !== '' && cashIncome !== '') {
                        this.income[itemIncome] = cashIncome;
                  }
            });

            let sum = 0;
            for (let key in this.income) {
                  sum += +this.income[key];
            }
            this.incomeMonth = sum;
      },

      addExpensesBlock: function () {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                  expensesPlus.style.display = 'none';
            }
      },

      getExpenses: function () {
            expensesItems.forEach((items) => {
                  let itemExpenses = items.querySelector('.expenses-title').value;
                  let cashExpenses = items.querySelector('.expenses-amount').value;
                  if (itemExpenses !== '' && cashExpenses !== '') {
                        this.expenses[itemExpenses] = cashExpenses;
                  }
            });
      },

      getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                  item = item.trim();
                  if (item !== '') {
                        this.addExpenses.push(item);
                  }
            });
      },

      //--------Сумма расходов---------------
      getExpensesMonth: function () {
            let sum = 0;
            for (let key in this.expenses) {
                  sum += +this.expenses[key];
            }
            this.expensesMonth = sum;
      },

      //--------Получение месячного и дневного бюджетов---------------
      getBudget: function () {

            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
            console.log(this);
      },
      
      // --------Получение периода выполнения цели---------------
      getTargetMonth: function () {
            return Math.ceil(targetAmount.value / this.budgetMonth);
      },

      getStatusIncome: function () {
            if (this.budgetDay >= 1200) {
                  return ('У вас высокий уровень дохода');
            }
            else if (1200 > this.budgetDay >= 600) {
                  return ('У вас средний уровень дохода');
            }
            else if (600 > this.budgetDay >= 0) {
                  return ('К сожалению у вас уровень дохода ниже среднего');
            }
            else {
                  return ('Что-то пошло не так');
            }
      },

      getInfoDeposit: function () {
            if (this.deposit) {
                  do {
                        this.percentDeposit = prompt('Какой годовой процент?');
                  } while (!isNumber(this.percentDeposit));

                  do {
                        this.moneyDeposit = prompt('Какая сумма заложена?');
                  } while (!isNumber(this.moneyDeposit));
            }
      },
      
      calcPeriod: function () {
           return this.budgetMonth * periodSelect.value;

      },
};


start.addEventListener('click', appData.start.bind(appData));
salaryAmount.addEventListener('input', appData.disableStart);
incomePlus.addEventListener('click', appData.addIncomeBlock);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', appData.changePeriodSelect);

cancel.addEventListener('click', appData.reset.bind(appData));