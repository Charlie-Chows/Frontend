let arr = [1,2,3,,5,6,7];

let context = { multiplier : 10 };

function multiplyByTen ( el ) {
    return el * this.multiplier;
}

Array.prototype.myMap = function ( cb, thisArg ) {

    if(!Array.isArray(this)) {
        throw new TypeError("this is not an array");
    }

    if(typeof cb !== "function") {
        throw new TypeError("callback is not a function");
    }

    let resultArray = [];
    for ( let i = 0; i < this.length; i++ ) {
        if ( i in this ) {
            resultArray[i] = cb.call(thisArg, this[i], i , this );  
        }
    }
    return resultArray;
}

let res = arr.myMap( multiplyByTen, context);   // with context
console.log(res); //[10, 20, 30, empty, 50, 60, 70]

let res1 = arr.myMap( (el) => el*2);    // without context
console.log(res1); // [2, 4, 6, empty, 10, 12, 14]