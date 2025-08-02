const display = document.getElementById('display');
const body = document.body;
let currentInput = '';
let resultShown = false;

// Update display content
function updateDisplay() {
  display.textContent = currentInput || '0';
}

// Append numbers
function appendNumber(number) {
  if (resultShown) {
    currentInput = number;
    resultShown = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Append operators
function appendOperator(operator) {
  if (currentInput === '') return;

  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/', '%'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1); // Replace last operator
  }

  currentInput += operator;
  resultShown = false;
  updateDisplay();
}

// Clear all input
function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

// Delete last character
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// Calculate result
function calculateResult() {
  try {
    let result = eval(currentInput);
    if (result === Infinity || isNaN(result)) {
      display.textContent = 'Error';
    } else {
      currentInput = result.toString();
      display.textContent = currentInput;
      resultShown = true;
    }
  } catch (error) {
    display.textContent = 'Error';
    currentInput = '';
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/', '%'].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});

// Dark mode toggle
function toggleTheme() {
  body.classList.toggle('dark');
}
