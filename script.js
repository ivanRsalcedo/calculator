let firstOperand;
let operator;
let secondOperand;

const buttons = document.querySelectorAll('button');
const display = document.querySelector('#results-display');

function updateDisplay(content) {
    display.value = content;
}

function operate(operator, firstOperand, secondOperand) {
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
    return b === 0 ? "Error: Division by zero" : a / b;
}