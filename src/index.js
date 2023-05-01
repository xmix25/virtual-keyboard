import { btns } from './buttons.js';

const main = createMain();
const input = createInputField();
const keyboardOptions = {
  lang: 'lang1',
  size: 'lower',
};

function createKeyboard() {
  const kb = document.createElement('div');
  for (let i = 1; i <= 5; i++) {
    const row = document.createElement('div');
    row.className = `keyboard__row keyboard__row-${i}`;
    kb.append(row);
  }
  kb.className = 'keyboard';
  kb.addEventListener('click', clickHandler);
  document.addEventListener('keydown', keyboardHandler);
  document.addEventListener('keyup', keyboardHandler);
  main.append(kb);
  renderButtons(keyboardOptions);
}

function renderButtons(options) {
  const { lang, size } = options;
  const rows = document.querySelectorAll('.keyboard__row');
  rows.forEach((row, i) => {
    row.innerHTML = '';
    btns.filter((btn) => btn.row === i + 1).forEach((btn) => {
      const key = document.createElement('button');
      key.className = `key ${btn.id} ${btn.control ? 'control-btn' : ' '}`;
      key.textContent = (typeof btn.value === 'string') ? btn.value : btn.value[lang][size];
      row.append(key);
    });
  });
}

function clickHandler(e) {
  e.preventDefault();
  const position = input.selectionStart;
  const targetBtn = e.target.closest('.key');
  const btnValue = targetBtn.classList.contains('control-btn') ? '' : targetBtn.textContent;
  if (targetBtn.classList.contains('Delete')) {
    deleteSymbol('del', position);
    return;
  } if (targetBtn.classList.contains('Backspace')) {
    deleteSymbol('bcksp', position);
    return;
  }
  input.focus();
  input.value = input.value.slice(0, position) + btnValue + input.value.slice(position);
  input.selectionStart = input.selectionEnd = position + 1;
}

function keyboardHandler(e) {
  e.preventDefault();
  const key = document.querySelector(`.${e.code}`);
  if (e.type === 'keydown') {
    key.classList.add('key_active');
    key.click();
  } else {
    key.classList.remove('key_active');
  }
}

function createInputField() {
  const input = document.createElement('textarea');
  input.className = 'input';
  input.rows = 5;
  main.append(input);
  return input;
}

function createMain() {
  const main = document.createElement('main');
  main.className = 'main';
  document.body.prepend(main);
  return main;
}

function deleteSymbol(key, position) {
  if (key === 'del') {
    input.value = input.value.slice(0, position) + input.value.slice(position + 1);
    input.focus();
    input.selectionStart = input.selectionEnd = position;
  } else if (key === 'bcksp') {
    const pos = position - 1 < 0 ? 0 : position - 1;
    input.value = input.value.slice(0, pos) + input.value.slice(position);
    input.focus();
    input.selectionStart = input.selectionEnd = pos;
  }
}

createKeyboard();
