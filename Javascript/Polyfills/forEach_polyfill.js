// steps to write polyfill for forEach 
// 1) it take 2 arguments one is callback function 2nd one is context but optional 
// 2) it will simply iterate elements it wont do anything like modifying existing array or return new array 

const arr = [ 1, 2, 3, 4, 5, 6, 7 ];
// const arr = [  ];   // empty array to check error handling

// // callback function without context 
function printNum ( el ) {
    console.log(el);
}

// context
let obj = {
    name : "Sujith",
}

// callback + context 
function printNum1 ( el ) {
    console.log( el + " " + this.name );
}

Array.prototype.myForEach = function ( cb, thisArgs ) {
    if(!Array.isArray(this)) {
        throw new TypeError(this + " It is not Array");
    }

    if(typeof cb !== "function") {
        throw new TypeError("callback is not a function");
    }
    
    if ( this.length === 0 ) {
        throw new TypeError("Empty array");
    }
    
    for ( let i = 0; i < this.length; i++ ) {
        cb.call( thisArgs || this, this[i], i, this );
    }
    
    return undefined;
}

arr.myForEach( printNum );
arr.myForEach( printNum1, obj);

// We need to explicitly log to see undefined unless we cant see it in console
const result = arr.myForEach( printNum1, obj); // it will return undefined because we are not returning anything in polyfill
console.log(result); // undefined

// Array.prototype.myForEach.call( {id:1,name:"chows" }, printNum); // {id:1,name:"chows" } is not array so it will throw error because we are sending context as object
// Array.prototype.myForEach.call( printNum ); // it will throw error because we are sending context as function



arr.forEach( printNum ); // it will work because we are using inbuilt forEach method
arr.forEach( printNum1, obj); // it will work because we are using inbuilt forEach method with context


/* 

BOTH OUTPUTS ARE SAME

1
2
3
4
5
6
7
1 Sujith
2 Sujith
3 Sujith
4 Sujith
5 Sujith
6 Sujith
7 Sujith

*/