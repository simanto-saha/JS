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



// const button = document.getElementById("showButton");
// const message = document.getElementById("message");

// button.addEventListener("click", function() {
//     const name = "Simanto";   // const variable e store
//     message.innerText = name; // show korbe
// });


// array 
// let mark = {
//     st1: 91,
//     st2: 72
// }
// let all_marks = [85,97,44,37,76,60]
// let result = null

// for (let i in all_marks){
//     result+=all_marks[i]
//     all_marks[i]=result
// }
// console.log(all_marks)

// function peopleID(name){
//     let people_name = ['simanto', 'rahul']
//     let people_id = [21,2]
//     let store = []


//     for (let i in people_name){
//         if (name === people_name[i]){
//             console.log(people_id[i])
//             alert(people_id[i])
//             store.push(people_id[i] + getRandom())
//         }
//     }
//     console.log(store)
// }

// full_name = prompt('told your name')
// peopleID(full_name)


// function getRandom() {
//   return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
// }

// console.log(getRandom());

// arrow function

// const added = (a,b) => {
//     console.log(a+b)
// }

// added(5,6)

function voul(latter){
    let value = ['a','e','i','o','u']
    let count = 0
    let lower = latter.toLowerCase()
    for (let i of value){
        for (let j of lower){
            if (i === j){
                count+=1
            }
        }
    }
    console.log(count)
}

str = prompt('write any kind of string: ')
voul(str)