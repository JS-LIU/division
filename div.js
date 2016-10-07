/**
 * Created by liudq on 16/10/3.
 */
//  被除数   dividend
//  除数    divisor
//  商     result
//  余数   remainder

function getResult(dividend,divisor){

    let remainder = "";
    let result = "";
    for(let i = 0;i < dividend.length;i++){
        remainder += dividend[i];

        let [newResult,newReminder] = getOneDigitResult(remainder,divisor);
        remainder = newReminder;
        result += newResult;

    }
    return [result,remainder];
}

function getOneDigitResult(remainder,divisor){
    let result = "";
    let newReminder = "";

    for(let i = 0; i < 10 ;i++){
        let product = multiplication(divisor,i);
        let myReminder = getNewReminder(remainder,product);

        if(reminderIsLessThanZero(myReminder)){
            result = (i-1).toString();
            break;
        }else{
            newReminder = myReminder;
        }
    }
    console.log('result---',result);
    console.log('newReminder---',newReminder);

    return [result,newReminder];
}

function getNewReminder(remainder,product){

    return subtraction(remainder,product);
}


function reminderIsLessThanZero(remainder){

    return remainder === "-";
}

//  减数   subtrahend
//  被减数 minuend
//  差    difference

function subtraction(subtrahend,minuend){
    let difference = "";
    let mySubtrahend = removeHeadStr(subtrahend,"0");
    let myMinuend = removeHeadStr(minuend,"0");

    let max = compare(mySubtrahend,myMinuend);

    if(isEqual(max,mySubtrahend)){

        let trimedSubtrahend = mySubtrahend.split('').reverse();
        let trimedMinuend = myMinuend.split('').reverse();
        for(let i = 0; i <trimedSubtrahend.length;i++ ){
            let oneDigitResult = (trimedSubtrahend[i] - (trimedMinuend[i]||0));

            if(oneDigitResult < 0){
                oneDigitResult = 10 + oneDigitResult;
                (trimedSubtrahend[i+1] -=1).toString() ;
            }

            difference += oneDigitResult;
        }
        difference = difference.split('').reverse().join('');

    }else {
        return difference = "-";
    }

    return difference;
}



function compare(a,b){

    if(a.length == b.length){
        return compareEqualLenStr(a,b);
    }else{
        return (a.length > b.length) ? a : b
    }
}
function compareEqualLenStr(a,b){
    let len = a.length;
    for(let i = 0;i < len;i++){
        if(a[i] > b[i]){
            return a;
        }
        if(a[i] < b[i]){
            return b;
        }
        if(a[i] == b[i] && i == len-1){
            return a;
        }
    }
}
function isEqual(a,b){
    let isEqual = true;
    for(let i = 0;i < a.length;i++){
        if(a[i] != b[i]){
            isEqual = false;
            break;
        }
    }
    return isEqual;
}


function removeHeadStr(targetStr,removeStr){
    if(targetStr[0] === removeStr){
        targetStr =  targetStr.substring(1);
        return removeHeadStr(targetStr,removeStr);
    }else{
        return targetStr;
    }
}

//  乘数   multiplier
//  被乘数 multiplicand
//  乘积  product

//  简单实现一个多位数乘以个位数（除法中暂时只需要这样）
function multiplication(multiplier,multiplicand){

    let result = "";
    let carry = 0;
    for(let i = multiplier.length-1;i >= 0;i--){
        let oneDigital = multiplier[i] * multiplicand;
        result += (oneDigital % 10 + carry).toString();

        carry = getCarry(oneDigital);
    }
    result += carry;
    return result.split('').reverse().join('');
}
function getCarry(a){
    return parseInt(a / 10);
}

