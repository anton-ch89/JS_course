'use strict';

const start = document.getElementById('start'),
      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],
      checkBox = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      budgetMonthValue = document.querySelector('.budget_month-value'),

      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('div.income-items  > .income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('div.expenses-items>.expenses-title'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      periodSelect = document.querySelector('.period-select'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      cancel = document.querySelector('#cancel'),
      depositCheck = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank');


let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');
// ---------------isNumber -------------
let isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
};


class AppData {
      constructor() {
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
      }

      start() {
            this.budget = +salaryAmount.value;
            this.getIncome();
            this.getExpenses();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getInfoDeposit();
            this.getAddIncome();
            this.getBudget();
            this.getTargetMonth();

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

      }

      disableStart() {
            if (!isNumber(salaryAmount.value) || +salaryAmount.value === 0 || salaryAmount === '') {
                  start.setAttribute('disabled', true);
            } else { start.removeAttribute('disabled'); }
      }
      reset() {
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
            depositCheck.checked = false;


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
            this.depositHandler();
      }

      getAddIncome() {
            additionalIncomeItem.forEach(item => {
                  let itemValue = item.value.trim();
                  if (itemValue !== '') {
                        this.addIncome.push(itemValue);
                  }
            });
      }

      showResult() {
           
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            incomePeriodValue.value = this.calcPeriod();
            targetMonthValue.value = this.getTargetMonth();
            periodSelect.addEventListener('change', () => {
                  incomePeriodValue.value = this.calcPeriod();
            });
      }

      changePeriodSelect() {
            periodAmount.innerHTML = periodSelect.value;
      }

      addIncomeBlock() {
            let cloneIncomesItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomesItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                  incomePlus.style.display = 'none';
            }
      }

      getIncome() {
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
      }

      addExpensesBlock() {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                  expensesPlus.style.display = 'none';
            }
      }

      getExpenses() {
            expensesItems.forEach((items) => {

                  let itemExpenses = items.querySelector('.expenses-title').value;
                  let cashExpenses = items.querySelector('.expenses-amount').value;
                  if (itemExpenses !== '' && cashExpenses !== '') {
                        this.expenses[itemExpenses] = cashExpenses;
                  }
            });
      }

      getAddExpenses() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach((item) => {
                  item = item.trim();
                  if (item !== '') {
                        this.addExpenses.push(item);
                  }
            });
      }

      //--------Сумма расходов---------------
      getExpensesMonth() {
            let sum = 0;
            for (let key in this.expenses) {
                  sum += +this.expenses[key];
            }
            this.expensesMonth = sum;
      }

      //--------Получение месячного и дневного бюджетов---------------
      getBudget() {
            const monthDeposit = Math.round(this.moneyDeposit * ((this.percentDeposit / 100)/12));
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
      }

      // --------Получение периода выполнения цели---------------
      getTargetMonth() {
            return Math.ceil(targetAmount.value / this.budgetMonth);
      }

      getStatusIncome() {
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
      }

      getInfoDeposit() {
            if (this.deposit) {
                  this.percentDeposit = depositPercent.value;
                  this.moneyDeposit = depositAmount.value;
            }
      }

      calcPeriod() {
            return periodSelect.value * this.budgetMonth;
      }

      checkPercentDeposit() {
            let percentValue = depositPercent.value;
            if (!isNumber(percentValue) || percentValue > 100 || percentValue < 1 ){
                  alert('Введите корректное значение в поле проценты');
                  percentValue = '';
                  start.setAttribute('disabled', true);
            }else {
                  start.sremoveAttribute('disabled');
            }
      }

      changePercent() {
            const valueSelect = this.value;
            if (valueSelect === 'other') {
                  depositPercent.value = '';
                  depositPercent.style.display = 'inline-block';
            }else {
                  depositPercent.value = valueSelect;
            }
      }

      depositHandler() {
            if (depositCheck.checked) {
                  depositBank.style.display = 'inline-block';
                  depositAmount.style.display = 'inline-block';
                  this.deposit = true;
                  depositBank.addEventListener('change', this.changePercent);
            } else {
                  depositBank.style.display = 'none';
                  depositAmount.style.display = 'none';
                  depositPercent.style.display = 'none';
                  depositBank.value = '';
                  depositAmount.value = '';
                  this.deposit = false;
                  depositBank.removeEventListener('change', this.changePercent);
            }
      }

      eventListeners() {
            salaryAmount.addEventListener('input', this.disableStart);
            start.addEventListener('click', this.start.bind(this));
            incomePlus.addEventListener('click', this.addIncomeBlock);
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            periodSelect.addEventListener('change', this.changePeriodSelect);
            cancel.addEventListener('click', this.reset.bind(this));
            depositCheck.addEventListener('change', this.depositHandler.bind(this));
            depositPercent.addEventListener('change', this.checkPercentDeposit.bind(this));

      }
}

const appData = new AppData();
appData.eventListeners();
