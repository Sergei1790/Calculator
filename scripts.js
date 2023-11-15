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
    return a / b;
}
let firstNumber = '';
let secondNumber = '';
let operator = '';
const currentScreen = document.querySelector('#sund-calculator__current');
const resultScreen = document.querySelector('#sund-calculator__result');
let result = false;
const equals = document.querySelector('#equals');

const clear = document.querySelector('#clear').addEventListener('click', function() {
    currentScreen.innerText = '';
    resultScreen.innerText = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    trigger = 0;
    result = false;
});

let trigger = 0;
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', toSecondNum);
});
numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', function() {
        currentScreen.innerText += this.innerText; 
        if(typeof firstNumber !== 'number'){
            firstNumber += this.innerText;
        } else{
            secondNumber += this.innerText;
        }
    });
});
function toSecondNum(){
    operator = this.innerText;
    firstNumber = Number(firstNumber);
    if(currentScreen.innerText.at(-1) === '+' ||
    currentScreen.innerText.at(-1) === '-' ||
    currentScreen.innerText.at(-1) === '×' ||
    currentScreen.innerText.at(-1) === '÷'
    ){
        currentScreen.innerText = currentScreen.innerText.slice(0, -1) + operator; 
    } else{
        currentScreen.innerText += operator;
    }
    if (result !== false) {
        secondNumber = '';
        result = false;
    } else if (secondNumber !== '') {
        operate();
    }
    // console.log(secondNumber);
    // if(trigger >= 1 && secondNumber !== ''){
    //     operate();
    //     trigger = 0;
    // }
    // trigger++;
    
    // console.log({firstNumber});
    // console.log({secondNumber});
    // console.log('-------');
}

function operate(){
    secondNumber = Number(secondNumber);
    switch (operator) {
        case '+':
            result = add(firstNumber, secondNumber);
        break;
        case '-':
            result = subtract(firstNumber, secondNumber);
        break;
        case '×':
            result = multiply(firstNumber, secondNumber);
        break;
        case '÷':
            if(secondNumber === 0){
                result = 'You cannot divide 0';
            } else{
                result = divide(firstNumber, secondNumber);
            }
        break;
    }
    resultScreen.innerText = result;
    firstNumber = result;
}
equals.addEventListener('click', operate);





