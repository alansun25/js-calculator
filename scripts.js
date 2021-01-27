

// update display when pressing buttons
let input = document.querySelector(".input");
function updateDisplay

function add(n, m) {
    return n + m;
}

function sub(n, m) {
    return n - m;
}

function mul(n, m) {
    return n * m;
}

function div(n, m) {
    if (m === 0) return "Error: Divide by zero."
    return n / m;
}

function operate(op, n, m) {
    return op(n, m);
}