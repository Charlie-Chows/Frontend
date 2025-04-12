<style>
/* 🌟 Heading Styles for Dark Theme */
h1 {
  color: #00ffff; /* Bright cyan */
  font-size: 36px;
  font-weight: bold;
  border-bottom: 3px solid #00ffff;
  padding-bottom: 10px;
  margin-top: 30px;
}

h2 {
  color: #ff7f50; /* Vibrant coral/orange */
  font-size: 28px;
  border-bottom: 2px dashed #ff7f50;
  padding-bottom: 6px;
  margin-top: 40px;
}

h3 {
  color: #aaff00; /* Bright lime green */
  font-size: 22px;
  margin-top: 25px;
  font-weight: bold;
}

/* 📌 Sub-Heading (side notes, definitions) */
.subheading {
  font-size: 18px;
  color: #CBA6F7; /* Soft gray */
  font-weight: bold;
  margin-top: 15px;
  margin-left: 10px;
}

/* ❗ Highlighted Questions */
.question {
  color: #ff4c4c; /* Red for attention */
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}

/* 💻 Code block enhancements */
code {
  background-color: #2d2d2d;
  color: #00ffea; /* Neon blue/cyan */
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 15px;
  font-family: Consolas, monospace;
}

/* 📝 Notes and Info Boxes */
.note {
  background-color: #222831;
  border-left: 6px solid #00adb5;
  padding: 12px 18px;
  margin: 12px 0;
  font-size: 15px;
  color: #eeeeee;
  border-radius: 6px;
}

/* ✨ Extra: Inline label style (like tags or highlights) */
.label {
  display: inline-block;
  background-color: #393e46;
  color: #f8b500;
  font-size: 13px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 5px;
}

.definition {
  color: #FFD700; /* gold/yellow for highlight on dark theme */
  font-size: 15px;
}
</style>



# JavaScript Concepts 📘

Welcome to my personal JavaScript notes!  
This file is a collection of essential concepts, code snippets, and explanations that I can revisit anytime. Feel free to use.

---

## 📚 Index

1. [call, apply, bind](#1-call-apply-bind)
2. [this keyword](#2-this-keyword)

---

## 1. call, apply, bind

### ✅ Example Code

```js
// Reusable function in different objects
let printFullName = function (hometown, state) {
    console.log(this.firstName + " " + this.lastName + " from " + hometown + " , " + state);
};

// Object 1
let name = {
    firstName: "Sujith",
    lastName: "Kumar",
};

// Object 2
let name2 = {
    firstName: "Yazith",
    lastName: "Roronoa",
};
```

### `call()`

<span class="definition"> Definition :</span>  Immediately invokes the function with a specified `this`context and comma-separated arguments.

```js
// Syntax: function.call(thisArg, arg1, arg2, ...)
printFullName.call(name, "kadapa", "AndhraPradesh");   // Sujith Kumar from kadapa , AndhraPradesh
printFullName.call(name2, "Chennai", "Tamilnadu");     // Yazith Roronoa from Chennai , Tamilnadu
```
###  `apply()`

<span class="definition"> Definition :</span> Just like `call()`, but takes arguments as an array instead of comma-separated.


```js
// Syntax: function.apply(thisArg, [arg1, arg2])
printFullName.apply(name2, ["Chennai", "Tamilnadu"]);  // Yazith Roronoa from Chennai , Tamilnadu
```

###  `call() & apply()`
```js
let args = ["Kadapa", "Andhra Pradesh"];

// Both are same:
printFullName.apply(name, args);
printFullName.call(name, ...args);
```
> ✅ **Note:**  
> - `apply()` accepts arguments as an array (`[arg1, arg2]`), whereas `call()` accepts them as comma-separated values.  
> -  Using the **spread operator (`...`)** with `call()` allows you to pass an array just like `apply()` does.  
> -  So both lines are functionally **equivalent** here.


###  `bind()`

<span class="definition"> Definition :</span> `bind()` creates a new copy of the function , it wont execute immediatly that we can invoke it later how is this .


```js
// Syntax: function.bind(thisArg, arg1, arg2)
// Note: Returns a new function which can be invoked later
let printMyName = printFullName.bind(name, "kadapa", "AndhraPradesh");
printMyName();  // Sujith Kumar from kadapa , AndhraPradesh

// You can also log the bound function
console.log(printMyName);
/*
ƒ ( hometown, state ) {
    console.log( this.firstName + " " + this.lastName + " from " + hometown + " , " + state );
}
*/
```
### 📌 Key Differences

| Feature       | `call()`                        | `apply()`                          | `bind()`                             |
|---------------|----------------------------------|-------------------------------------|--------------------------------------|
| **Execution** | Immediately                      | Immediately                         | Returns a new function               |
| **Arguments** | Comma-separated                  | Passed as an array                  | Comma-separated (used for binding)   |
| **Use Case**  | Call with known arguments        | Call when you already have an array | Save for later execution             |

 ## 2. this Keyword 
 - What are all the present in top level comes under global space , we can access this in global scope.
   ```js
    console.log(this)

    // - it will provide ouput as window object ( global object )
    // - if we run this in browser we will get window object as output 
    // - if we run this in node we will get global object as output
   ```

<span class="subheading"> use strict :</span>
```js

"use strict"
console.log(this); // window object 

function a() {
		// window object if use-strict mode is off 
		// undefined if strict mode is on 
    console.log(this);  // undefined 
} 
a();

```
- if it is non-strict mode function automatically connected to global scope so it log as window object
- if strict mode is on it wont connected to global scope so it log as undefine
 

```js

"use strict"
console.log(this); // window object 

function a() {
    console.log(this);  
} 
a(); // undefined 
window.a();  // window object

```
- this keyword value vary based on how we are calling a function 

<span class="question">why it is log window object even in strict mode ? </span>

- now there is no explicit owner to a function while calling it take global scope as reference in non - strict mode
- but in strict mode it wont connected to global scope but when call `window.a()` now it take global scope as reference that's why it log as window object

<span class="question">What is difference b/w method & function ?</span>

- If we make a function as a part of an object is called method

<span class="subheading">this key word inside object</sapn>
```js
// Call 

const student1 = {
    name : "Sujith",
    printname : function () {
        console.log(this.name);
    }
}

const student2 = {
    name : "kumar",
}

student1.printname();  // Sujith
student1.printname.call(student2);  // Kumar

```

- now we don’t have `printName` method in `student2` but it is present in `student1` , we can share that method to `student2` using `call` method.
- we overriding the `this` reference  temporarily , how it internally look like ⬇️

```js
const student1 = {
    name : "Sujith",
    printname : function () {
        console.log(this.name);
    }
}

const student2 = {
    name : "kumar",
    printname : function () {
        console.log(this.name);
    }
}

student1.printname();  // Sujith
student1.printname.call(student2);  // Kumar

```

<span class="subheading">this inside arrow functions</span>

```js
const obj = {
    a : 11,
    x : () => {
        console.log(this) // window obj
    }
}
obj.x();

```
<div class="note">
  Arrow functions don't have their own <code>this</code>. They inherit from the lexical scope.
</div>

<span class="question"> Why it is log as window object ?</span> 

- The key reason is that **arrow functions do not have their own `this`**. Instead, they inherit `this` from their **enclosing lexical context** (the surrounding function or scope where they are defined).

<span class="question">What if they are in nested arrow function ?</span>
```js
const obj = {
    a : 11,
    x : () => {
       const y = () => {
            console.log(this); // window object
        }
        y();
    }
}
obj.x();

```
- `y` is arrow function so it doesn’t have own `this`
- it will look for enclosing lexical context which `x`
- `x` is also arrow it doesn’t have it’s own `this`
- then `x` enclosing lexical context is `global scope` that’s why it log as window object

<span class="question">What if they are in nested  function ?</span>
```js
const obj1 = {
    a : 11,
    x : function () {
        const y = () => {
            console.log(this);  // {a: 11, x: ƒ}
        }
        y();
    }
}
obj1.x();

```

- Now arrow function surrounded function is `x` ( normal function ) so `x` refers to `obj1` , arrow functions logs `obj1` 

<span class="question">What if function are in nested arrow  function ?</span>
```js

const obj = {
    a: 11,
    x: () => {
        const y = function () {  
            console.log(this);
        };
        y(); // called as a normal function
    }
};

obj.x(); // Logs: window (or undefined in strict mode)

```

<span class="question ">why `y` ( normal function ) doesn’t take as obj reference ? </span > 

- `y` called as a normal function not with a explicit owner so it won’t take `obj` as reference.

<span class="subheading ">this keyword in DOM </span>
```js
<!DOCTYPE html>
<html>
	<head>
		<title> this keyword demo in DOM </title>
	</head>
    
	<body>
		<h1> this in DOM </h1>
		<button onClick="alert(this)"> Click Me 1</button>
		<button onClick="alert(this.tagName)"> Click Me 2</button> 
	</body>
</html>

```
- `[object HTMLButtonElement]`   output once we clicked on `Click Me 1` button.
- `BUTTON`  output once we clicked on `Click Me 2` button, it will take tag name as reference.
- Here `this` refer `<button>` ( HTML element ) tag as it’s value.

