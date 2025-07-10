let firstOperand;
let operator;
let secondOperand;
let calculated;
const operators = ['+', '-', '×', '÷'];


const buttons = document.querySelectorAll('.btn-num, .btn-func');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.textContent);
    });
});

const btnClear = document.querySelector('#btn-clear');

btnClear.addEventListener('click', () => {
    clearAll();
});

const btnDel = document.querySelector('#btn-del');

btnDel.addEventListener('click', () => {
    if (calculated) return; // no backspacing finished calculations

    if (operator === null) { // if there's no operator, we know the user has yet to input a first operand
        firstOperand = firstOperand.slice(0, -1);
        updateDisplay(firstOperand);
        checkForDecimals(firstOperand);
    } else if (secondOperand !== '') { //if there's an operator, we know the user is working on the secondOperand
        secondOperand = secondOperand.slice(0, -1);
        updateDisplay(`${firstOperand} ${operator} ${secondOperand}`);
        updateHistory(`${firstOperand} ${operator} ${secondOperand}`);
        checkForDecimals(secondOperand);
    } else { // the user must be wanting to delete the operator by this point
        operator = null;
        updateDisplay(firstOperand);
        updateHistory(firstOperand);
        checkForDecimals(firstOperand);
    }
});

const display = document.querySelector('#results-display');
const history = document.querySelector('#history');
const btnDecimal = document.querySelector('#decimal');

clearOperands();

function clearOperands() {
    firstOperand = '';
    operator = null;
    secondOperand = '';
    display.style.fontSize = '65px';
}

function clearAll() {
    clearOperands();
    updateDisplay('');
    updateHistory('');
}

function handleInput(input) {
    if (calculated) {
        if (operators.includes(input)) { // if user inputs an operator after a prior calculation
            operator = input;
            firstOperand = display.value;
            secondOperand = '';
            updateDisplay(firstOperand);
            updateHistory(`${firstOperand} ${operator}`);
        } else {
            clearAll();
            handleOperandAssignment(input);
        }
        calculated = false;
    } else {
        handleOperandAssignment(input);
    }
}

function handleOperandAssignment(input) {
    if (!isNaN(input) || input === '.') { // if input is a number
        if (operator === null) { // if an operator hasn't been chosen
            firstOperand += input;
            firstOperand = normalizeOperand(firstOperand);
            updateDisplay(firstOperand);
            if (input === '.') {
                checkForDecimals(firstOperand);
            }
        } else { // if an operator has been chosen then we know user entering second operand
            if (input === '.') enableButton(btnDecimal, false);
            secondOperand += input;
            secondOperand = normalizeOperand(secondOperand);
            updateHistory(`${firstOperand} ${operator} ${secondOperand}`);
            updateDisplay(`${firstOperand} ${operator} ${secondOperand}`);
        }
    } else if (operators.includes(input) && firstOperand != '') { // if input is an operator
        operator = input;
        updateDisplay(input);
        updateHistory(`${firstOperand} ${operator}`);
        enableButton(btnDecimal, true);
    } else if (input === '=' && firstOperand != null && operator != null && secondOperand != '') { // if input is '='
        updateDisplay(parseFloat(operate().toFixed(6)));
        calculated = true;
        enableButton(btnDecimal, true);
    }
}

function normalizeOperand(operand) {
    if (operand.includes('.')) {
        return operand.replace(/^0+(?=\d\.)/, '');
    } else {
        return operand.replace(/^0+(?!$)/, '');
    }
}

function checkForDecimals(operand) {
    if (operand.includes('.')) {
        enableButton(btnDecimal, false);
        return;
    } else {
        enableButton(btnDecimal, true);
    }
}

function enableButton(button, enabling) {
    button.disabled = !enabling;

    if (enabling) {
        button.style.filter = 'saturate(1)';
        button.style.cursor = 'pointer';
    } else {
        button.style.filter = 'saturate(0)';
        button.style.cursor = 'not-allowed';    
    }
}

function updateDisplay(content) {
    display.value = content;
    autoResizeText();
}

function updateHistory(content) {
    history.textContent = content;
}

function autoResizeText() {
    const maxFontSize = 65;
    const minFontSize = 15;
    let fontSize = maxFontSize;

    display.style.fontSize = fontSize + 'px';

    while (display.scrollWidth > display.clientWidth && fontSize > minFontSize) {
        fontSize--;
        display.style.fontSize = fontSize + 'px';
    }
}

function operate() {
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    switch (operator) {
        case '+':
            return add(firstOperand, secondOperand);
        case '-':
            return subtract(firstOperand, secondOperand);
        case '×':
            return multiply(firstOperand, secondOperand);
        case '÷':
            return divide(firstOperand, secondOperand);
        default:
            return 'Error';
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? "Error" : a / b;
}