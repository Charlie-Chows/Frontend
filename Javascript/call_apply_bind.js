// Reusable function in different objects
let printFullName = function ( hometown, state ) {
    console.log( this.firstName + " " + this.lastName + " from " + hometown + " , " + state );
}

// function barrowing
// in call method first argument we set for `this` need to point which object refernce here `name2`.
// we can add N number of parameters just by `,` separated
let name = {
    firstName : "Sujith",
    lastName : "Kumar",
}

printFullName.call(name, "kadapa", "AndhraPradesh" );   // Sujith Kumar from kadapa , AndhraPradesh

let name2 = {
    firstName : "Yazith",
    lastName : "Roronoa",
}

printFullName.call(name2, "Chennai", "Tamilnadu" );     // Yazith Roronoa from Chennai , Tamilnadu

// apply 
// the only difference from call & apply is the way we pass arguments call is `,` separated, in apply we pass as array 
printFullName.apply(name2, [ "Chennai", "Tamilnadu" ] );    // Yazith Roronoa from Chennai , Tamilnadu

// bind 
// it is same as call but we can invoke later 
let printMyName = printFullName.bind(name, "kadapa", "AndhraPradesh" );
printMyName();  // Sujith Kumar from kadapa , AndhraPradesh

console.log(printMyName);   // it will print full function 
/*      OUTPUT

ƒ ( hometown, state ) {
    console.log( this.firstName + " " + this.lastName + " from " + hometown + " , " + state );
}

*/