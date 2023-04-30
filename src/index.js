import { btns } from './buttons.js';

const main = document.querySelector('.main');
const input = createInputField()

function createKeyboard() {
  const kb = document.createElement('div');
  for (let i = 1; i <= 5; i++) {
    const row = document.createElement('div');
    row.className = `keyboard__row keyboard__row-${i}`;
    kb.append(row);
  }
  kb.className = 'keyboard';
  main.append(kb);
  renderButtons();
}
function renderButtons() {
  const rows = document.querySelectorAll('.keyboard__row');
  rows.forEach((row, i) => {
    row.innerHTML = '';
    btns.filter((btn) => btn.row === i + 1).forEach((btn) => {
      const key = document.createElement('button');
      key.classList.add('key',`${btn.name}`);
      key.textContent = btn.value;
      row.append(key);
    });
  });
}

function createInputField () {
  const input = document.createElement('textarea');
  input.className = 'input';
  input.rows = 5;
  main.append(input)
  return input;
}

createKeyboard();