var domCalcKey = document.getElementById('calculator');
domCalcKey.addEventListener('click',main);
var dataArray = [];
var str = ''; //строка для занесения в dataArgument
var stateDot = false;

function main(event) {
    var symbolData = event.target.getAttribute('data-value'); // получаем символ
    var classSymbol = event.target.className; // получаем класс символа(если есть)

    if (classSymbol === 'cancel') {
        dataArray = [];
        str = '';
        stateDot = false;
    }
    if (classSymbol === 'number') {
        if (symbolData ==='.' && stateDot === false) {
            // if (str === '') { //переделал в тернарный // str = (str === '')?'0.':'.';
            //     str += '0';
            // }
            // str += '.';
            str += (str.length>0)?'.':'0.';
            stateDot = true;
        }
        if (isFinite(symbolData)) { //если на прилитело число, добавляем его к строке
            str +=symbolData;
        }
        if (symbolData === '=') { //если символ = запускаем вычисления
            if (isFinite(str) && !isFinite(dataArray[dataArray.length])) {
                dataArray[dataArray.length] = str;
            } else if ((str === '0.' || str === '0') && !isFinite(dataArray[dataArray.length])) { // проверка можно опустить
                dataArray.length --;
            }
            calc();
        }
    }
    if (classSymbol === 'operator') {
        stateDot = false; //любой оператор признак что сбросить статус точки для другого числа
        if (isFinite(str)) {
            dataArray[dataArray.length] = str;
            dataArray[dataArray.length] = symbolData;
            str = '';
        } else if (dataArray[dataArray.length-1] !== symbolData) {
            dataArray[dataArray.length-1] = symbolData;
            str = '';
        }
    }

    var result = '';
    for (var count=0; count < dataArray.length; count++){ result += dataArray[count]; }
    if (result.length + str.length > 8){ //меняем шрифт если не влазит строка
        document.getElementById('output').style.fontSize='0.5em';
    } else if (result.length + str.length > 18) { //меняем шрифт если не влазит строка
        document.getElementById('output').style.fontSize = '5px';
    }
    document.getElementById('output').innerHTML = result + str; // выводим внужное поле
}

function calc() { //тут происходят вычисления
    var result = parseFloat(dataArray[0]);
    // if (dataArray.length % 2 === 0){ alert('ошибка формулы');}
    for(var count=0, operand = dataArray[count+1] ; count <= dataArray.length; count +=2, operand = dataArray[count+1]){ //
        if (operand === '+'){
            result += parseFloat(dataArray[count+2]);
        } else if (operand === '-'){
            result -= dataArray[count+2];
        } else if (operand === '*'){
            result *= dataArray[count+2];
        } else if(operand === '/'){
            result /= dataArray[count+2];
        }
    }
    dataArray = [];
    str = result;
}