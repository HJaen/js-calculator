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
    return x / y;
}

// Give an operation and it'll return
// the result w/ the 2 numbers x, y
function operate(op, x, y) {
    return op(x, y);
}