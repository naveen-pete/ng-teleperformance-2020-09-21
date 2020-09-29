console.log('JS Demos');

// ES5 - Function statement syntax
// function sum(a, b) {
//   return a + b;
// }

// ES5 - Function expression syntax
// var sum = function (a, b) {
//   return a + b;
// };

// Lambda functions
// ES6 - Arrow function syntax #1
// var sum = (a, b) => {
//   return a + b;
// };

// ES6 - Arrow function syntax #2
var sum = (a, b) => a + b;

// ES6 - Arrow function syntax #3 - one param
var double = n => n * 2;

// ES6 - Arrow function syntax #4 - no params
var sayHello = () => console.log('hello');

// sum = arr => {
//   // iterate thru the arr;
//   // return the sum;
// };

var result = sum(40, 50);

console.log('result:', result);
console.log('double:', double(5));
sayHello();