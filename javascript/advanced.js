function caller(callback) {
  callback();
}

function logger() {
  console.log('hello world');
}

// caller(logger);

class Store {
  constructor() {
    this.inventory = [
      {shoes: 10,},
      {socks: 10,},
      {pants: 1000}
    ];
  }

  printInventory() {
    console.log(this.inventory);
  }

}

let store = new Store();

// map
function map(arr, callback) {
  let result = [];
  for(let element of arr) {
    let returnedValue = callback(element);
    result.push(returnedValue);
  }
  return result;
}

let endResult = map([1, 2, 3, 4], function(ele) {
  return ele * 2;
})

// function double(num) {
//   return num * 2;
// }

// console.log(map([1, 2, 3, 4], element => element * 2));
