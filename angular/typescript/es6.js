// let is like var but it's "block scoped"
let myVar = 10;
// const is like let but doesn't support variable reassignment
const unchanging = 10;

// The old way of defining classes
function Node(value) {
  this.val = value;
  this.next = null;
}

Node.prototype.myMethod = function() {
  console.log('called');
}

// the new way of defining classes
class Person {
  constructor(name) {
    this.name = name;
    this.health = 100;
  }
}

// inheritance
class Ninja extends Person {
  karateChop() {
    console.log('hi-ya!');
  }
}

// let myNinja = new Ninja("Bruce");
// console.log(myNinja);

// function myFunction() {
//   console.log('calling my function');
// }

let myFunction = () => {
  console.log('this is a fat arrow function');
}

myFunction()