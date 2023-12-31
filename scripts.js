// Culculator functions
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
// /Culculator functions

// Variables
let firstNumber = '';
let secondNumber = '';
let operator = '';
let previousText = '';
let zeroDivide;
const currentScreen = document.querySelector('#sund-calculator__current');
const resultScreen = document.querySelector('#sund-calculator__result');
let result = false;
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const del = document.querySelector('#del');
const dot = document.querySelector('#dot');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const allButtons = document.querySelectorAll('.sund-calculator__button');
// /Variables

let operatorClicked = false;
// Function to reset screens
function clearScreen(){
    currentScreen.innerText = '';
    resultScreen.innerText = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    previousText = '';
    result = false;
    operatorClicked = false;
}
clear.addEventListener('click',clearScreen);
// /Function to reset screens

// Function to delete number
function deleteNumber(){
    if(typeof firstNumber !== 'number'){
        firstNumber = firstNumber.slice(0, -1);
        currentScreen.innerText = currentScreen.innerText.slice(0, -1)
    } else if(typeof secondNumber !== 'number'){
        secondNumber = secondNumber.slice(0, -1);
        currentScreen.innerText = currentScreen.innerText.slice(0, -1)
    }
}
del.addEventListener('click',deleteNumber);
// /Function to delete number

// Function to prevent more than one '.' in number
function preventDotFromSecondClick(number){
    let splitNumber = number.split('.');
    if (splitNumber.length > 2) {
        // Remove the extra '.'
        return splitNumber[0] + '.' + splitNumber[1];
    }
    return number;
}
// /Function to prevent more than one '.' in number

// Adding numbers to our firstNumber and secondNumber
numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', function() {
        if(typeof firstNumber !== 'number'){
            firstNumber += this.innerText;
            firstNumber = preventDotFromSecondClick(firstNumber);
            currentScreen.innerText += this.innerText;
            currentScreen.innerText = preventDotFromSecondClick(currentScreen.innerText);  
        } else if(typeof secondNumber !== 'number'){
            secondNumber += this.innerText;
            secondNumber = preventDotFromSecondClick(secondNumber);
            currentScreen.innerText = previousText + preventDotFromSecondClick(secondNumber);
        }
    });
});
// /Adding numbers to our firstNumber and secondNumber

// Switching to input secondNumber if we press operator
operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () =>{
        // Moved here operator = this.innerText; because of keyboard support
        operator = operatorBtn.innerText;
        toSecondNum();
    });
});
// /Switching to input secondNumber if we press operator

// Function when pressing on operator
function toSecondNum(){
    // Prevent from pressing operator if we have nothing in input
    if(firstNumber === ''){
        return;
    }
    // Prevent from pressing operator if we have nothing in input
    
    // Checking if we have secondNumber and result
        if (secondNumber !== '' && result == false) {
        operate();
    }
    // /Checking if we have secondNumber and result

    // Updating current screen
    if(result != false){
        currentScreen.innerText = result;
    }
    // /Updating current screen

    // reseting 
    secondNumber = '';
    result = false;
    // /reseting 

    // catching operator and make firstNumber from string to number
    // Moving up operator = this.innerText; because of keyboard support
    // operator = this.innerText;
    firstNumber = Number(firstNumber);
    // /catching operator and make firstNumber from string to number

    // checking if we pressed operator many times
    if(currentScreen.innerText.at(-1) === '+' ||
    currentScreen.innerText.at(-1) === '-' ||
    currentScreen.innerText.at(-1) === '×' ||
    currentScreen.innerText.at(-1) === '÷'
    ){
        currentScreen.innerText = currentScreen.innerText.slice(0, -1) + operator; 
    } else{
        currentScreen.innerText += operator;
    }
    // /checking if we pressed operator many times
    
    previousText = currentScreen.innerText;

    // Check if divided by 0 
    if(zeroDivide === true){
        clearScreen();
        zeroDivide = false;
    }
}
// /Function when pressing on operator


// Function when pressing on '='
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
                zeroDivide = true;
                result = 'You cannot divide 0';
                break;
            } else{
                result = divide(firstNumber, secondNumber);
            }
        break;
    }
    result = roundToFourDecimalPlaces(result);
    currentScreen.innerText += ` = ${result}`;
    resultScreen.innerText = result;
    firstNumber = result;
}
// /Function when pressing on '='

// +preventing pressing '=' if there is no secondNumber
equals.addEventListener('click', function(){
    if(typeof firstNumber === 'number' && secondNumber !==''){
        operate();
    }
});
// /+preventing pressing '=' if there is no secondNumber

// function to round to .0000 if number has > 4 signs after '.'
function roundToFourDecimalPlaces(number) {
    if (Number.isFinite(number) && number.toString().includes('.')) {
        let decimalPlaces = number.toString().split('.')[1].length;
        if (decimalPlaces > 4) {
            return Number(number.toFixed(4));
        }
    }
    return number;
}
// /function to round to .0000 if number has > 4 signs after '.'

// Keyboard Support
document.addEventListener("keydown", (event) => {
    console.log(`key=${event.key},code=${event.code}`);
    if(event.key >=0 && event.key <=9 || event.key === '.'){
        if(typeof firstNumber !== 'number'){
            firstNumber += event.key;
            firstNumber = preventDotFromSecondClick(firstNumber);
            currentScreen.innerText += event.key;
            currentScreen.innerText = preventDotFromSecondClick(currentScreen.innerText);  
        } else if(typeof secondNumber !== 'number'){
            secondNumber += event.key;
            secondNumber = preventDotFromSecondClick(secondNumber);
            currentScreen.innerText = previousText + preventDotFromSecondClick(secondNumber);
        }
    }

    if(event.key === '+' || event.key === '-' ||
        event.key === '*' || event.key === '/'){
        operator = event.key;
        if(event.key === '*'){
            operator = '×';
        } else if (event.key === '/'){
            operator = '÷';
        }
        toSecondNum();
    }

    if ((event.key === '=' || event.key === 'Enter') &&
    typeof firstNumber === 'number' && secondNumber !=='') {
        event.preventDefault();
        event.stopPropagation();
        operate();
    }

    if(event.key === 'Backspace' || event.key === 'Delete'){
        deleteNumber();
    }
    if(event.key === 'c'){   
        event.preventDefault();
        event.stopPropagation();
        clearScreen();
    }
});
// //Keyboard Support

// Add .highlighted for css whe buttons pressed or clicked
document.addEventListener("keydown", (event) => {
    const pressedKey = event.key;
    allButtons.forEach(btn => {
        if (btn.textContent === pressedKey) {
            if (!btn.classList.contains('highlighted')) {
                allButtons.forEach(otherBtn => {
                    if (otherBtn !== btn) {
                        otherBtn.classList.remove('highlighted');
                    }
                });
                btn.classList.add('highlighted');
            } else {
                btn.classList.remove('highlighted');
            }
        }
    });
});

allButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        if (!btn.classList.contains('highlighted')) {
            allButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('highlighted');
                }
            });
            btn.classList.add('highlighted');
        } else {
            btn.classList.remove('highlighted');
        }
    });
});
// /Add .highlighted for css whe buttons pressed or clicked


//     нажимаем числа, которые добавляються в num1 если оно строка, а 
//     если стало намбер, то числа, которые добавляються в num2

//     - вводим первое число (строка),
//     - когда нажимаем оператор:
//     1. первое число из строки переводим в намбер
//     2. хоть 100 раз нажимаем оператор - добавляется только последний
//     3. проверяем если есть результат, тогда обнуляем второе число и результат,
//     если нет, то просто работаем

//     - вводим второе число (строка)
//    - когда нажимаем = второе число переводим в намбер 
//    - нажимаем =
//    1. проводим операцию:
//     2. результат добавляем в result, который был false
//     3. num1 равняем результату
//     4. если нажимаем = опять, то повторяется операция
//     в итоге 2 + 2 = 4;
//     4 + 2 = 6;




