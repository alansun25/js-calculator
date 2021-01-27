// create 'clicking' effect on buttons
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.cssText = 'box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.212); transform: scale(1);';
    })

    button.addEventListener('mouseup', () => {
        button.style.cssText = '';
    })
})

// input display
const input = document.querySelector('.input');

// fill display with numbers clicked
const nums = document.querySelectorAll('.number');
nums.forEach(num => {
    num.addEventListener('click', () => {
        if (input.textContent === '0') input.textContent = '';
        input.textContent = input.textContent + num.textContent;
    })
})

// fill display with operations clicked
const ops = document.querySelectorAll('.oper');
ops.forEach(op => {
    op.addEventListener('click', () => {
        input.textContent = `${input.textContent} ${op.textContent} `;
    })
})

// evaluate
const enter = document.querySelector(".return");
enter.addEventListener('click', () => {
    input.textContent = evaluate();
});

// take the square root
const rad = document.querySelector(".radical");
rad.addEventListener('click', () => {
    input.textContent = sqrt(evaluate());
})

// square the value
const square = document.querySelector(".squared");
square.addEventListener('click', () => {
    input.textContent = sq(evaluate());
})

// clear display
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    input.textContent = '0';
})

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

function operate(oper, n, m) {
    const x = parseFloat(n);
    const y = parseFloat(m);

    switch (oper) {
        case "÷":
            return div(x, y);
        case "×":
            return mul(x, y);
        case "+":
            return add(x, y);
        case "-":
            return sub(x, y);
        default:
            return null;
    }
}

function sqrt(n) {
    if (n < 0) return "Error: Square root of a negative."
    return Math.sqrt(n);
}

function sq(n) {
    const x = parseFloat(n);
    return x**2;
}

function hasNoOps(expr) {
    if (expr.includes('÷') || expr.includes('×') || expr.includes('-') || expr.includes('+')) {
        return false;
    }
    return true;
}

function evaluate() {
    const expr = input.textContent.split(" ");
    console.log(expr)

    // check if the input is just one num
    if (hasNoOps(expr)) {
        return expr[0];
    } else {
        let result;
        for (let i = 0; i < expr.length - 1; i+=2) {
            result = operate(expr[i + 1], expr[i], expr[i + 2]); // operator will always be between two nums
            expr[i + 2] = result; // store the recent result as the first num of the next expr
        }
        return result;
    }
}