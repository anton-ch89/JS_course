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


const AppData = function() {
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
};

AppData.prototype.start = function () {
      this.budget = +salaryAmount.value;
      this.getIncome();
      this.getExpenses();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getIncome();
      this.getBudget();
      this.getAddIncome();
      this.calcPeriod();
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

};

AppData.prototype.disableStart = function () {
      if (!isNumber(salaryAmount.value) || +salaryAmount.value === 0 || salaryAmount === '') {
           start.setAttribute('disabled', true);
      } else {start.removeAttribute('disabled');}
};
AppData.prototype.reset = function () {
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

      incomePeriod.value = 0;
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
};

AppData.prototype.getAddIncome =  function () {
      additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                  this.addIncome.push(item.value);
            }
      });
};

AppData.prototype.showResult = function () {
      const _this = this;
      budgetMonth.value = this.budgetMonth;
      budgetDay.value = this.budgetDay;
      expensesMonth.value = this.expensesMonth;
      additionalExpenses.value = this.addExpenses.join(', ');
      additionalIncome.value = this.addIncome.join(', ');
      targetMonth.value = this.getTargetMonth();
      periodSelect.addEventListener('change', _this.calcPeriod);
};

AppData.prototype.changePeriodSelect = function () {
      periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.addIncomeBlock = function () {
      let cloneIncomesItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
      }
};

AppData.prototype.getIncome = function () {
      incomeItems.forEach(items => {
            const _this = this;
            let itemIncome = items.querySelector('.income-title').value;
            let cashIncome = items.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                  _this.income[itemIncome] = cashIncome;
            }
      });

      let sum = 0;
      for (let key in this.income) {
            sum += +this.income[key];
      }
      this.incomeMonth = sum;
};

AppData.prototype.addExpensesBlock = function () {
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
      }
};

AppData.prototype.getExpenses = function () {
      expensesItems.forEach((items) => {
            const _this = this;
            let itemExpenses = items.querySelector('.expenses-title').value;
            let cashExpenses = items.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                  _this.expenses[itemExpenses] = cashExpenses;
            }
      });
};

AppData.prototype.getAddExpenses = function () {
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                  this.addExpenses.push(item);
            }
      });
};

//--------Сумма расходов---------------
AppData.prototype.getExpensesMonth = function () {
      let sum = 0;
      for (let key in this.expenses) {
            sum += +this.expenses[key];
      }
      this.expensesMonth = sum;
};

//--------Получение месячного и дневного бюджетов---------------
AppData.prototype.getBudget = function () {

      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
};

// --------Получение периода выполнения цели---------------
AppData.prototype.getTargetMonth = function () {
      return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.getInfoDeposit = function () {
      if (this.deposit) {
            do {
                  this.percentDeposit = prompt('Какой годовой процент?');
            } while (!isNumber(this.percentDeposit));

            do {
                  this.moneyDeposit = prompt('Какая сумма заложена?');
            } while (!isNumber(this.moneyDeposit));
      }
};

AppData.prototype.calcPeriod = function () {
     
      incomePeriod.value = periodSelect.value * appData.budgetMonth;
};

AppData.prototype.eventListeners = function () {

      salaryAmount.addEventListener('input', appData.disableStart);
      start.addEventListener('click', appData.start.bind(appData));

      incomePlus.addEventListener('click', appData.addIncomeBlock);
      expensesPlus.addEventListener('click', appData.addExpensesBlock);
      periodSelect.addEventListener('change', appData.changePeriodSelect);
      
      cancel.addEventListener('click', appData.reset.bind(appData));
};


const appData = new AppData();
AppData.prototype.eventListeners();

