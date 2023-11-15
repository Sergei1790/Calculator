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
    if (secondNumber !== '' && result == false) {
        operate();

       
        // if (result !== false) {
        //     secondNumber = '';
        //     result = false;
        // } 
    }
    secondNumber = '';
    result = false;
    if (secondNumber == '') {
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
    }
    

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


// 2+2-
// 2 + 2 = 4;

    
    // else if (secondNumber !== '') {
    //     operate();
    // }
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
    // console.log({firstNumber});
    // console.log({secondNumber});
    // console.log({result});
    // currentScreen.innerText = result;

    resultScreen.innerText = result;
    firstNumber = result;
  
}
equals.addEventListener('click', operate);





