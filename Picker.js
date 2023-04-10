/**
 * CSE186 Assignment 3 - Advanced
 */
class Picker {
  /**
   * Create a date picker
   * @param {string} containerId id of a node the Picker will be a child of
   *
   */
  constructor(containerId) {
    this.currentDateElement;
    if (containerId == undefined) {
      return undefined;
    }
    this.container = document.getElementById(containerId);
    this.createTable();
    const today = new Date();
    const currentFullYear = today.getFullYear();
    this.displayedYear = currentFullYear;
    const currentFullMonth = today.getMonth();
    this.displayedMonth = currentFullMonth;
    const currentDay = today.getDate();
    this.currentDate = today;
    this.generateMonth(currentFullYear, currentFullMonth, currentDay);
  }
  /**
   *
   * @param {number} year
   * @param {number} month
   * @param {number} day
   * @return {number}
   */
  getIndexFromDate(year, month, day) {
    const firstDate = new Date(year, month, 1);
    const index = firstDate.getDay() + day - 1;
    return index;
  }

  /**
   *
   * @param {object} event
   * @return {undefined}
   */
  onclickpick(event) {
    const element = event.target;
    if (this.currentDateElement) {
      this.currentDateElement.id = this.currentDateElement.defaultId;
    }
    element.id = 'today';
    this.currentDateElement = element;
    this.currentDate = new Date(element.year,
        element.month,
        parseInt(element.textContent),
    );
    if (element.classList == 'notInsideMonthNext') {
      const date = new Date(
          this.displayedYear,
          this.displayedMonth + 1,
          parseInt(element.textContent),
      );
      this.currentDate = date;
      this.generateMonth(
          date.getFullYear(),
          date.getMonth(),
      );
    } else if (element.classList == 'notInsideMonthPrev') {
      const date = new Date(
          this.displayedYear,
          this.displayedMonth - 1,
          parseInt(element.textContent),
      );
      this.currentDate = date;
      this.generateMonth(
          date.getFullYear(),
          date.getMonth(),
      );
    }
  }

  /**
   *
   * @param {number} year
   * @param {number} month
   * @return {undefined}
   */
  generateMonth(year, month) {
    this.dayElements.forEach((element, i) => {
      // Credit:https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
      element.classList.toggle('notInsideMonthPrev', false);
      element.classList.toggle('notInsideMonthNext', false);
      element.id = 'd' + i;
      element.month = month;
      element.year = year;
      element.defaultId = 'd' + i;
    });

    const firstDate = new Date(year, month, 1);
    this.displayedMonth = firstDate.getMonth();
    this.displayedYear = firstDate.getFullYear();
    this.yearOfDate.textContent = this.monthNames[this.displayedMonth];
    this.yearOfDate.textContent += ' ' + this.displayedYear;
    const now = firstDate.getTime();
    for (let i = 1; i <= firstDate.getDay(); i++) {
      const date = new Date(now - i * 1000 * 60 * 60 * 24);
      const previousElement = this.dayElements[firstDate.getDay() - i];
      previousElement.classList.add('notInsideMonthPrev');
      previousElement.textContent = date.getDate();
    }
    let prevday = 0;
    let offset = 0;
    for (let i = 0; i <= 41 - firstDate.getDay(); i++) {
      let daylightsaving = false;
      const date = new Date(now + (i + offset) * 1000 * 60 * 60 * 24);
      const currentElement = this.dayElements[firstDate.getDay() + i];
      if (date.getDate() === this.currentDate.getDate() &&
        date.getMonth() === this.currentDate.getMonth() &&
        date.getFullYear() === this.currentDate.getFullYear()) {
        this.currentDateElement = currentElement;
        currentElement.id = 'today';
      }
      // Checks to see if current month is not inside another month
      if (date.getMonth() !== firstDate.getMonth()) {
        currentElement.classList.add('notInsideMonthNext');
      }

      if (prevday === date.getDate()) {
        offset += 1;
        daylightsaving = true;
      }

      if (daylightsaving) {
        currentElement.textContent = date.getDate() + 1;
        prevday = date.getDate() + 1;
      } else {
        prevday = date.getDate();
        currentElement.textContent = date.getDate();
      }
    }
  }
  /**
   * @return {undefined}
   */
  createTable() {
    // Credit:https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    const table1 = (document.createElement('div'));
    table1.id = 'titleContainer';
    // Credit:https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
    this.container.appendChild(table1);
    const previous = document.createElement('div');
    previous.id = 'prev';
    previous.addEventListener('click', () => {
      const date = new Date(this.displayedYear, this.displayedMonth - 1, 1);
      this.generateMonth(
          date.getFullYear(),
          date.getMonth(),
      );
    });
    table1.appendChild(previous);
    // Credit:https://stackoverflow.com/questions/1643320/get-month-name-from-date
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    this.yearOfDate = document.createElement('div');
    this.yearOfDate.id = 'display';
    this.yearOfDate.addEventListener('click', () => {
      this.displayedYear = this.currentDate.getFullYear();
      this.displayedMonth = this.currentDate.getMonth();
      const date = new Date(this.displayedYear, this.displayedMonth);
      this.generateMonth(
          date.getFullYear(),
          date.getMonth(),
      );
    });

    table1.appendChild(this.yearOfDate);
    const next = document.createElement('div');
    next.id = 'next';
    next.addEventListener('click', ()=> {
      const date = new Date(this.displayedYear, this.displayedMonth + 1, 1);
      this.generateMonth(
          date.getFullYear(),
          date.getMonth(),
      );
    });
    table1.appendChild(next);
    const dayString = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.table = (document.createElement('table'));
    this.container.appendChild(this.table);
    this.dayElements = [];
    for (let x = 0; x < 7; x++) {
      const tableHeader = document.createElement('th');
      tableHeader.textContent = dayString[x];
      this.table.appendChild(tableHeader);
    }
    for (let row = 0; row < 6; row++) {
      const rowElement = document.createElement('tr');
      for (let col = 0; col < 7; col++) {
        const colElement = document.createElement('td');
        rowElement.appendChild(colElement);
        colElement.id = 'd' + ((row * 7) + col);
        colElement.textContent = (row * 7) + col;
        this.dayElements.push(colElement);
        colElement.addEventListener('click', (e) => this.onclickpick(e));
      }
      this.table.appendChild(rowElement);
    }
  }
}

// To satisfy linter rules
new Picker('picker');
