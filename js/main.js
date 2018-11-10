var unirest = require("unirest");

function runScript(e) {
  e.preventDefault();
  if (e.keyCode == 13) {
    showResult();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  //event listener and click event
  document.querySelector("button").addEventListener("click", displayData);
  function displayData(e) {
    //alert("onclick Event detected!");
    //console.log(e.target);
    //console.log(e);
    showResult();
  }

  //slice array to make copy a random element in array
  Array.prototype.randomslice = function() {
    let randomIndex = Math.floor(Math.random() * this.length);
    let end;
    let randomSlice;
    if (randomIndex < this.length) {
      end = randomIndex + 1;
      randomSlice = this.slice(randomIndex, end);
      //return randomSlice;
    } else {
      randomSlice = this.slice(-1);
      //return randomSlice;
    }
    return randomSlice;
  };

  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let vowels = ["A", "E", "I", "O", "U"];

  function getResult() {
    let i;
    let compareMe = [];
    let result = [];
    let myDiv = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten"
    ];
    //loop ten times and slice a random letter element from arrays and input into a div html element
    for (i = 0; i < 10; i++) {
      if (i < 8) {
        result.push(alphabet.randomslice());
        document.getElementById(myDiv[i]).innerHTML = result[i].toString();
        //console.log("slice: ", result.toString());
      } else {
        result.push(vowels.randomslice());
        document.getElementById(myDiv[i]).innerHTML = result[i].toString();
      }
    }
  }
  //call method to slice array and input into dom
  getResult();

  function showResult() {
    let i;
    let myString = document.querySelector(".textInput").value;
    let res = myString.split("");
    console.log("input string: ", res);
    let divD = [
      "oneD",
      "twoD",
      "threeD",
      "fourD",
      "fiveD",
      "sixD",
      "sevenD",
      "eightD",
      "nineD",
      "tenD"
    ];
    for (i = 0; i < 10; i++) {
      if (i < res.length) {
        document.getElementById(divD[i]).innerHTML = res[i].toString();
      }
    }
  }

  /*let word = prompt("Enter a word please");
  word = word.toUpperCase();

  let alphabet = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10
  };

  let letter,
    i,
    sum = 0;
  for (i = 0; i < word.length; i++) {
    letter = word[i];
    sum += alphabet[letter];
  }
  alert(sum);*/
});
