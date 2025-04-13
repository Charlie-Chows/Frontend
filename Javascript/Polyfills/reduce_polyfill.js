

// Polyfill for Array.prototype.reduce
Array.prototype.myReduce = function ( cb, initialValue ) {

    // Check if the context is an array 
    if ( !Array.isArray( this ) ) {
        throw new TypeError( 'myReduce is not a Array' );
    }

    if ( typeof cb !== 'function' ) {
        throw new TypeError( 'myReduce is not a function' );
    }

    if ( this.length === 0 && initialValue === undefined ) {
        throw new TypeError( "reduce of empty array with no initial value ");
    }

    let accumulator = initialValue !== undefined ? initialValue : this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;
    for ( let i = startIndex; i < this.length; i++ ) {
        if ( i in this ) {  // Check if the index is not empty (sparse array)
            accumulator = cb( accumulator, this[i], i , this );
        }
    }
    return accumulator;
}


let arr = [1,2,3,4,,6,7,8,9,10];

let res = arr.myReduce((acc, cur) =>{ return acc + cur },0);
console.log(res); // 50