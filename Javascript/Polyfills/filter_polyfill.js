

// Custom implementation of Array.prototype.filter method
// The filter() method creates a new array with all elements that pass the test implemented by the provided function.


Array.prototype.myFilter = function ( cb, thisArgs ) {
    if (!Array.isArray(this)) {
        throw new TypeError('myFilter is not a function');
    }

    if ( typeof cb !== 'function') {
        throw new TypeError('cb is not a function');
    }

    let resultArray = [];
    for ( let i = 0; i < this.length; i++) {
        if ( i in this ) {  // Handle sparse arrays
            if ( cb.call(thisArgs, this[i], i, this) ) {
                resultArray.push(this[i]);
            }
        }
    }
    return resultArray;
}

let arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let context = { threshold: 7 };

function isGreateThanSeven ( el ) {
    return el > this.threshold;
}

let withoutContextResult = arr.myFilter((el)=> el > 5);  // without context 
console.log( withoutContextResult ); // [6, 7, 8, 9, 10]

let withContextResult = arr.myFilter(isGreateThanSeven, context); // with context
console.log( withContextResult ); // [8, 9, 10]