const numsBtn = document.querySelectorAll('.num');
const opsBtn = document.querySelectorAll('.op');
const decimalBtn = document.querySelector('.decimal');
const equalsBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.querySelector('.delete-btn');
const prevEquationScreen = document.querySelector('.prev-equation');
const currentInputScreen = document.querySelector('.curr-input');
let operand0, operand1;
let shouldResetScreen = false;
let currOp = '';

operand0 = operand1 = 0;
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', popCurrNum);
numsBtn.forEach((button) => button.addEventListener('click', () => appendCurrNum(button.textContent)));
opsBtn.forEach((button) => button.addEventListener('click', () => setOp(button.textContent[0])));   // Ensure only operators are stored
decimalBtn.addEventListener('click', appendDecimal);
equalsBtn.addEventListener('click', evaluate);

// Calculator Screen Functions
// Append number to screen's current number
function appendCurrNum(num) {
    if (shouldResetScreen) resetCurr();
    num = Number(num);

    if (currentInputScreen.textContent === '0') {
        currentInputScreen.textContent = num;
    } else {
        currentInputScreen.textContent += num;
    }
}

function appendDecimal() {
    if (shouldResetScreen) resetCurr();
    if (currentInputScreen.textContent === '') currentInputScreen.textContent = '0';
    if (currentInputScreen.textContent.includes('.')) return;
    currentInputScreen.textContent += '.';
}

// Push current input to the prev input and
// clear current input text
function pushToPrev() {
    prevEquationScreen.textContent += currentInputScreen.textContent;
    operand0 = Number(currentInputScreen.textContent);
    currentInputScreen.textContent = '';
}

// Reset the calculator's text
function clearScreen() {
    prevEquationScreen.textContent = '';
    currentInputScreen.textContent = '0';
    operand0 = operand1 = 0;
}

// Reset the current input
function resetCurr() {
    currentInputScreen.textContent = '';
    shouldResetScreen = false;
}

// Pop number from screen's current number
function popCurrNum() {
    console.log('hi');
    if (currentInputScreen.textContent === '0') return;
    if (currentInputScreen.textContent.length === 1) {
        currentInputScreen.textContent = '0';
        return;
    }

    currentInputScreen.textContent = currentInputScreen.textContent
                                    .toString()
                                    .slice(0, -1);
                                    
}

// Set the calculator's operator
function setOp(op) {
    if (currOp !== '') evaluate();
    operand0 = currentInputScreen.textContent;
    currOp = op;
    prevEquationScreen.textContent = `${operand0} ${currOp}`;
    shouldResetScreen = true;
}

// Calculator Arithmetic Functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) return x;
    return x / y;
}

// Get result from operate and update prev screen
// and curr screen accordingly
function evaluate() {
    if (currOp === '' || shouldResetScreen) return;
    if (currOp === '÷' && currentInputScreen.textContent === '0') {
        alert("That's not possible!");
        return;
    }
    operand1 = currentInputScreen.textContent;
    currentInputScreen.textContent = roundRes(operate());
    prevEquationScreen.textContent = `${operand0} ${currOp} ${operand1} = `;
    currOp = '';
}

// Give an operation and it'll return
// the result w/ the 2 numbers x, y
function operate() {
    operand0 = Number(operand0);
    operand1 = Number(operand1);
    
    if (currOp === '+') {
        return add(operand0, operand1);
    } else if (currOp === '-') {
        return subtract(operand0, operand1);
    } else if (currOp === '×') {
        return multiply(operand0, operand1);
    } else {
        if (operand1 === 0) return null;
        return divide(operand0, operand1);
    }
}

// Round answers to 2 decimal points
function roundRes(num) {
    return Math.round(num * 100) / 100;
}