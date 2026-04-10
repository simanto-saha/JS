// let result = prompt("What is your number?");

// if (result > 50) {
//     alert("You pass the exam!");
//     console.log("Congratulations!");
// }

// else {
//     alert("You fail the exam!");
//     console.log("Better luck next time!");
// }


// let full_name = "simanto";


// for (let i = 0; i < 10; i++){
//     console.log(full_name);
// }


// for (let i = 0; i <101; i++){
//     if(i % 2 === 0){
//         console.log(i);
//     }
// }

// let fullname = prompt("What is your name?");

// console.log("@"+fullname+fullname.length);


// document.getElementById("showButton").addEventListener("click", function() {
//     document.getElementById("message").innerText = "Simanto";
// });



const button = document.getElementById("showButton");
const message = document.getElementById("message");

button.addEventListener("click", function() {
    const name = "Simanto";   // const variable e store
    message.innerText = name; // show korbe
});