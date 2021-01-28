let result = 0;

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
const dec = document.querySelector(".decimal");
const nums = document.querySelectorAll('.number');
nums.forEach(num => {
    num.addEventListener('click', () => {
        if (displayHasPreviousSolution() || input.textContent.includes('Error')) input.textContent = '';
        
        // prevent putting more than one decimal point in a single value
        if (num.textContent === '.' && limitDecimals()) {
            dec.disabled = true;
        } 
        else {
            dec.disabled = false;
            input.textContent = input.textContent + num.textContent;
        } 

        console.log(input.textContent.split(" "));
    })
})

// fill display with operations clicked
const ops = document.querySelectorAll('.oper');
ops.forEach(op => {
    op.addEventListener('click', () => {
        // result of the calculation used as the first number in the new calculation when evaluating more than a single pair of numbers
        input.textContent = evaluate(); 
        input.textContent = `${input.textContent} ${op.textContent} `;
    })
})
const expo = document.querySelector('.expo');
expo.addEventListener('click', () => {
    input.textContent = evaluate();
    input.textContent = `${input.textContent} ^ `;
})

// evaluate expression
const enter = document.querySelector(".return");
enter.addEventListener('click', () => {
    if (validInput()) input.textContent = evaluate();
    else input.textContent = 'Error: invalid input.' 
});

// take the square root
// TODO: make it so that it only evaluates a full expr like this if there are parens, else just sqrt
const rad = document.querySelector(".radical");
rad.addEventListener('click', () => {
    if (validInput()) {
        const e = evaluate();
        if (e < 0) {
            input.textContent = "Error: sqrt of a negative.";
        } else {
            result = sqrt(e);
            if (result.toString().includes('.')) result = result.toFixed(3); // if decimal, round to 3 places
            input.textContent = result;
        }  
    } else {
        input.textContent = 'Error: invalid input.'
    }
})

// compute factorial
const fact = document.querySelector('.factorial');
fact.addEventListener('click', () => {
    if (validInput()) {
        result = fac(evaluate());
        input.textContent = result;
    } else {
        input.textContent = 'Error: invalid input.' 
    }
})

// clear display
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    result = 0;
    dec.disabled = false;
    input.textContent = result;
})

// delete previous entry
const del = document.querySelector('.delete');
del.addEventListener('click', () => {
    const ops = '+-×÷^%';
    let display = input.textContent.split(' ');
    if (display.length === 1) {
        result = 0;
        input.textContent = result;
    } else if (ops.includes(display[display.length - 1])) {
        input.textContent = display[0]; 
        // kind of brute force, but couldn't get the operators to get deleted otherwise
        // works because there can only be max 3 things in the array at once
    }
    else {
        display.pop();
        input.textContent = `${display.join(' ')} `
    }
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
    if (m === 0) return "Error: divide by zero."
    return n / m;
}

function mod(n, m) {
    return n % m;
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
        case "%":
            return mod(x, y);
        case "^":
            return exp(x, y);
        default:
            return null;
    }
}

function sqrt(n) {
    return Math.sqrt(n)
}

function fac(n) {
    let prod = 1;
    for (let i = n; i > 0; i--) {
        prod *= i;
    }
    return prod;
}

function exp(base, exponent) {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    return Math.pow(b, e);
}

function hasNoOps(expr) {
    return !(expr.includes('÷') || expr.includes('×') || expr.includes('-') || expr.includes('+') || expr.includes('^') || expr.includes('%'));
}

function evaluate() {
    const expr = input.textContent.split(" ");
    console.log(expr);

    // check if the input is just one num
    if (hasNoOps(expr)) {
        console.log(hasNoOps(expr)); // for debugging
        return expr[0];
    } else {
        result = operate(expr[1], expr[0], expr[2]); // operator will always be between two nums; expr is always length 3

        if (!isNaN(result) && result.toString().includes('.')) result = result.toFixed(3); // if decimal, round to 3 places
        return result;
    }
}

function displayHasPreviousSolution() {
    return input.textContent === result.toString();
}

function limitDecimals() {
    const display = input.textContent.split(' ');
    let overLimit;
    display.map(val => {
        const valChars = val.split('');
        let numDecimals = 0;
        for (let i = 0; i < valChars.length; i++) {
            if (valChars[i] === '.') {
                numDecimals++;
            }
        }
        overLimit = numDecimals >= 1;
    })
    return overLimit;
}

function validInput() {
    const display = input.textContent.split(' ');
    return !(isNaN(display[display.length - 1]) || input.textContent.charAt(input.textContent.length - 1) === ' ');
}