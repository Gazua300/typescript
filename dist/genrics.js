"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const returnValue = (value) => value;
const message = returnValue(true);
function getFirstValueFromArray(array) {
    return array[0];
}
const stringArray = getFirstValueFromArray(['a', 'b', 'c']);
const numberArray = getFirstValueFromArray([1, 2, 3]);
const boolArray = getFirstValueFromArray([false, true]);
//Promises
const returnPromise = () => __awaiter(void 0, void 0, void 0, function* () {
    return 5;
});
//Classes
class WithGenerics {
    constructor(zeroValue, sum) {
        this.zeroValue = zeroValue;
        this.sum = sum;
    }
}
const genericNumber = new WithGenerics('Salvaodr', (x, y) => {
    return x + y;
});
console.log(genericNumber, genericNumber.sum('Casa', ' nossa'));
