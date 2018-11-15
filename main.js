document.addEventListener("DOMContentLoaded", function() {
  let $ = require("jquery");

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
  //event listener and click event
  let modalBody = document.querySelector(".modal-body");

  // Get the modal
  let modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  document.querySelector(".close").addEventListener("click", closeModal);
  // get the send and new game button elements
  document.querySelector(".send").addEventListener("click", displayData);
  document.querySelector(".button6").addEventListener("click", startGame);

  function displayData(e) {
    showResult();
  }
  function startGame() {
    document.querySelector("div#one.lettersOdd").classList.add("flipX");
    document.querySelector("div#three.lettersOdd").classList.add("flipX");
    document.querySelector("div#five.lettersOdd").classList.add("flipX");
    document.querySelector("div#seven.lettersOdd").classList.add("flipX");
    document.querySelector("div#nine.lettersOdd").classList.add("flipX");
    //load class flipY into even divs
    document.querySelector("div#two.lettersEven").classList.add("flipY");
    document.querySelector("div#four.lettersEven").classList.add("flipY");
    document.querySelector("div#six.lettersEven").classList.add("flipY");
    document.querySelector("div#eight.lettersEven").classList.add("flipY");
    document.querySelector("div#ten.lettersEven").classList.add("flipY");

    //window.location.reload();
    //call method to slice array and input into dom
    setTimeout(getResult, 9000);
    for (let i = 0; i < 10; i++) {
      document.getElementById(divD[i]).innerHTML = "";
    }
    setTimeout(removeFlip, 9000);
    var startTime = new Date().getTime();
    let stopMe = setInterval(function() {
      $(".loader").css({ visibility: "visible" });
      if (new Date().getTime() - startTime > 8000) {
        clearInterval(stopMe);
        $(".loader").css({ visibility: "hidden" });
        return;
      }
    }, 2000);
  }

  function removeFlip() {
    //remove class flipX into odd divs
    document.querySelector("div#one.lettersOdd").classList.remove("flipX");
    document.querySelector("div#three.lettersOdd").classList.remove("flipX");
    document.querySelector("div#five.lettersOdd").classList.remove("flipX");
    document.querySelector("div#seven.lettersOdd").classList.remove("flipX");
    document.querySelector("div#nine.lettersOdd").classList.remove("flipX");
    //remove class flipY into even divs
    document.querySelector("div#two.lettersEven").classList.remove("flipY");
    document.querySelector("div#four.lettersEven").classList.remove("flipY");
    document.querySelector("div#six.lettersEven").classList.remove("flipY");
    document.querySelector("div#eight.lettersEven").classList.remove("flipY");
    document.querySelector("div#ten.lettersEven").classList.remove("flipY");
  }
  function closeModal() {
    modal.style.display = "none";
  }
  //event listener for enter in input field
  $(".textInput").on("keyup", function(e) {
    if (e.keyCode == 13) {
      showResult();
    }
  });

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

  //start a new game and get new random letters
  function getResult() {
    let i;
    //let compareMe = [];
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

  function showResult() {
    let i;
    //get user input
    let myString = document.querySelector(".textInput").value.toUpperCase();
    //clear input field
    document.querySelector("input.textInput").value = "";
    //turn array of strings into a string
    let res = myString.split("");
    console.log("input string: ", res);

    let unirest = require("./js/unirest.js");
    unirest
      .get("https://wordsapiv1.p.mashape.com/words/" + myString + "/also")
      .header(
        "X-Mashape-Key",
        "dbwwCjBPvPmshUBqeoOKBqHdFjw2p1h6XhFjsnyJvxW781cP5G"
      )
      .header("X-Mashape-Host", "wordsapiv1.p.mashape.com")
      .end(function(result) {
        console.log(result.status, result.headers, result.body);
        if (result.status === 200) {
          console.log("status ok: ", result.status);
          for (i = 0; i < 10; i++) {
            document.getElementById(divD[i]).innerHTML = "";
            if (i < res.length) {
              document.getElementById(divD[i]).innerHTML = res[i].toString();
            }
          }
        } else {
          modalBody.textContent =
            "status code: " + result.status + ", word not found";

          modal.style.display = "block";
        }
      });
    loadSpin();
  }
  function loadSpin() {
    //load class spin into divs
    document.querySelector("div#oneD.spinMe").classList.add("spin");
    document.querySelector("div#twoD.spinMe").classList.add("spin");
    document.querySelector("div#threeD.spinMe").classList.add("spin");
    document.querySelector("div#fourD.spinMe").classList.add("spin");
    document.querySelector("div#fiveD.spinMe").classList.add("spin");
    document.querySelector("div#sixD.spinMe").classList.add("spin");
    document.querySelector("div#sevenD.spinMe").classList.add("spin");
    document.querySelector("div#eightD.spinMe").classList.add("spin");
    document.querySelector("div#nineD.spinMe").classList.add("spin");
    document.querySelector("div#tenD.spinMe").classList.add("spin");
    setTimeout(removeSpin, 6000);
  }
  function removeSpin() {
    //remove class spin from divs
    document.querySelector("div#oneD.spinMe").classList.remove("spin");
    document.querySelector("div#twoD.spinMe").classList.remove("spin");
    document.querySelector("div#threeD.spinMe").classList.remove("spin");
    document.querySelector("div#fourD.spinMe").classList.remove("spin");
    document.querySelector("div#fiveD.spinMe").classList.remove("spin");
    document.querySelector("div#sixD.spinMe").classList.remove("spin");
    document.querySelector("div#sevenD.spinMe").classList.remove("spin");
    document.querySelector("div#eightD.spinMe").classList.remove("spin");
    document.querySelector("div#nineD.spinMe").classList.remove("spin");
    document.querySelector("div#tenD.spinMe").classList.remove("spin");
  }
});
