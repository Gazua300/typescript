"use strict";
const returnValue = (value) => value;
const message = returnValue('Hello World!');
const count = returnValue(35);
const bool = returnValue(false);
function getFirstValueFromArray(array) {
    return array[0];
}
const stringArray = getFirstValueFromArray(['a', 'b', 'c']);
const numberArray = getFirstValueFromArray([1, 2, 3]);
const boolArray = getFirstValueFromArray([false, true]);
console.log(stringArray, numberArray, boolArray);
