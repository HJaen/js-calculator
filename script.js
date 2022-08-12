const numsBtn = document.querySelectorAll('.num');
const numsBtnArr = Array.from(numsBtn);
const opsBtn = document.querySelectorAll('.op');
const opsBtnArr = Array.from(opsBtn);
const equalsBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.querySelector('.delete-btn');
const prevEquationScreen = document.querySelector('.prev-equation');
const currentInputScreen = document.querySelector('.curr-input');
let clearScreenForSecondNum = false;
let operand0, operand1;
let currOp = '';
operand0 = operand1 = 0;

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

// Give an operation and it'll return
// the result w/ the 2 numbers x, y
function operate() {
    console.log('in operate');
    let res = 0;
    
    if (currOp === 'add') {
        res = add(operand0, operand1);
    } else if (currOp === 'subtract') {
        res = subtract(operand0, operand1);
    } else if (currOp === 'multiply') {
        res = multiply(operand0, operand1);
    } else {
        res = divide(operand0, operand1);
    }

    clearScreenForSecondNum = true;
    appendCurrNum(res);
}

function appendCurrNum(num) {
    num = Number(num);
    if (currentInputScreen.textContent === '0' || clearScreenForSecondNum) {
        currentInputScreen.textContent = num;
        clearScreenForSecondNum = false;
    } else {
        currentInputScreen.textContent += num;
    }
}

function popCurrNum() {
    // Make sure a zero is displayed instead of a blank screen
    if (currentInputScreen.textContent === '0') return;
    if (currentInputScreen.textContent.length === 1) {
        currentInputScreen.textContent = '0';
        return;
    }

    currentInputScreen.textContent = currentInputScreen
                                    .textContent
                                    .toString()
                                    .slice(0, -1);
}

function pushToPrev(opName) {
    currOp = opName;
    operand0 = Number(currentInputScreen.textContent);
    if (prevEquationScreen.textContent !== '') {
        operate();
    }
    prevEquationScreen.textContent = currentInputScreen.textContent + ' ' + opName;
    clearScreenForSecondNum = true;
}

function resetScreen() {
    console.log('reset');
    currentInputScreen.textContent = '0';
    prevEquationScreen.textContent = '';
}

function equals() {
    operand1 = Number(currentInputScreen.textContent);
    prevEquationScreen.textContent += ' ' + currentInputScreen.textContent;
    clearScreenForSecondNum = true;
    operate();
}

clearBtn.addEventListener('click', resetScreen);
deleteBtn.addEventListener('click', popCurrNum);
numsBtn.forEach((button) => button.addEventListener('click', () => appendCurrNum(button.textContent)));
opsBtn.forEach((button) => button.addEventListener('click', () => pushToPrev(button.id)));
equalsBtn.addEventListener('click', equals);