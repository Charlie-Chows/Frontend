
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

**Definition :** Immediately invokes the function with a specified `this`context and comma-separated arguments.

```js
// Syntax: function.call(thisArg, arg1, arg2, ...)
printFullName.call(name, "kadapa", "AndhraPradesh");   // Sujith Kumar from kadapa , AndhraPradesh
printFullName.call(name2, "Chennai", "Tamilnadu");     // Yazith Roronoa from Chennai , Tamilnadu
```
###  `apply()`

**Definition :** Just like `call()`, but takes arguments as an array instead of comma-separated.


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

**Definition :** `bind()` creates a new copy of the function , it wont execute immediatly that we can invoke it later how is this .


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

### use strict 
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

**why it is log window object even in strict mode ?**

- now there is no explicit owner to a function while calling it take global scope as reference in non - strict mode
- but in strict mode it wont connected to global scope but when call `window.a()` now it take global scope as reference that's why it log as window object

**What is difference b/w method & function ?**

- If we make a function as a part of an object is called method

**this key word inside object**
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

**this inside arrow functions**

```js
const obj = {
    a : 11,
    x : () => {
        console.log(this) // window obj
    }
}
obj.x();

```
  - Arrow functions don't have their own <code>this</code>. They inherit from the lexical scope.

**Why it is log as window object ?** 

- The key reason is that **arrow functions do not have their own `this`**. Instead, they inherit `this` from their **enclosing lexical context** (the surrounding function or scope where they are defined).

**What if they are in nested arrow function ?**
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

**What if they are in nested  function ?**
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

**What if function are in nested arrow  function ?**
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

**why `y` ( normal function ) doesn’t take as obj reference ?**

- `y` called as a normal function not with a explicit owner so it won’t take `obj` as reference.

**this keyword in DOM**
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

