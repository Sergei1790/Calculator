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
const current = document.querySelector('#sund-calculator__current');
const result = document.querySelector('#sund-calculator__result');
const equals = document.querySelector('#equals');

const clear = document.querySelector('#clear').addEventListener('click', function() {
    current.innerText = '';
    result.innerText = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    trigger = 0;
});

let trigger = 0;
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', toSecondNum);
});
function toSecondNum(){
    operator = this.innerText;
    firstNumber = Number(firstNumber);
    if(current.innerText.at(-1) != operator){
        current.innerText += operator; 
    } 
    if(trigger == 1){
        operate();
        trigger = 0;
    }
    trigger++;
}
numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', function() {
        current.innerText += this.innerText; 
        if(typeof firstNumber !== 'number'){
            firstNumber += this.innerText;
        } else{
            secondNumber += this.innerText;
        }
    });
});
function operate(){
    secondNumber = Number(secondNumber);
    trigger = 0;
    switch (operator) {
        case '+':
            result.innerText = add(firstNumber, secondNumber);
        break;
        case '-':
            result.innerText = subtract(firstNumber, secondNumber);
        break;
        case '×':
            result.innerText = multiply(firstNumber, secondNumber);
        break;
        case '÷':
            if(secondNumber === 0){
                result.innerText = 'You cannot divide 0';
            } else{
                result.innerText = divide(firstNumber, secondNumber);
            }
        break;
    }
    // secondNumber = firstNumber;
    // firstNumber = +result.innerText;
    firstNumber = result.innerText;
    // secondNumber = '';
}
equals.addEventListener('click', operate);





