/* 
  Simple JavaScript calculator made by Patryk Ulichnowski.
*/

let sign = '';
let screen = document.getElementById('screen');
let userInputNumber = 0;
let memorizedNumber = undefined;
let result = 0;
const wasSolved = false;

function addListeners() {
  let numberArray = document.querySelectorAll('#number');
  let operatorsArray = document.querySelectorAll('#operator');
  for (let i = 0; i < numberArray.length; i++) {
    if (i == 9) {
      numberArray[i].numberID = 0;
    } else {
      numberArray[i].numberID = i + 1;
    }
    numberArray[i].addEventListener('click', userInput);
  }
  for (let i = 0; i < operatorsArray.length; i++) {
    // Here we add what type of sign to use
    switch (i) {
      case 0:
        operatorsArray[i].sign = '+'; break;
      case 1:
        operatorsArray[i].sign = '-'; break;
      case 2:
        operatorsArray[i].sign = '*'; break;
      case 3:
        operatorsArray[i].sign = '/'; break;
      case 4:
        operatorsArray[i].sign = 'sqrt'; break;
      case 5:
        operatorsArray[i].sign = 'C'; break;
      case 6:
        operatorsArray[i].sign = '='; break;
    }
    operatorsArray[i].addEventListener('click', calculation)
  }

}

function userInput() {
  if (userInputNumber == 0) {
    userInputNumber = String(event.target.numberID);
  } else {
    userInputNumber += String(event.target.numberID);
  }
  screen.innerHTML = userInputNumber;
}

function calculation() {
  let triger = String(event.target.sign); // Grabs what type of operator caused function
  if (triger !== '=' || triger === 'sqrt' || triger === 'C') {
    // Square root
    if (triger === 'sqrt') {
      if (memorizedNumber === undefined) {
        // Square root for first number
        screen.innerHTML = Math.sqrt(Number(userInputNumber));
        memorizedNumber = Math.sqrt(Number(userInputNumber));
      } else {
        // square root for already calculated number
        screen.innerHTML = Math.sqrt(Number(memorizedNumber));
        memorizedNumber = Math.sqrt(Number(memorizedNumber));
      }
    } else {
      if (triger === 'C') {
        // clean option
        screen.innerHTML = 0;
        result = 0;
        memorizedNumber = 0;
        userInputNumber = 0;
      } else {
        // This part is executed when operator is different than '='
        if (memorizedNumber === undefined || memorizedNumber === userInputNumber) {
          memorizedNumber = Number(userInputNumber);
        }
        userInputNumber = 0;
        sign = triger;
      }
    }
  }
  else {
    switch (sign) {
      // Here are just calculations
      case '+':
        result = Number(Number(memorizedNumber) + Number(userInputNumber)); break;
      case '-':
        result = Number(Number(memorizedNumber) - Number(userInputNumber)); break;
      case '*':
        result = Number(Number(memorizedNumber) * Number(userInputNumber)); break;
      case '/':
        result = Number(Number(memorizedNumber) / Number(userInputNumber)); break;
      case '=':
        result = Number(memorizedNumber); break;
    }
    screen.innerHTML = result;
    memorizedNumber = result; // We pass the result to mem so user can do operations on result
    userInputNumber = 0;
    console.log('mem ' + memorizedNumber);
    console.log('us ' + userInputNumber);
    console.log('sum ' + result);
  }
}