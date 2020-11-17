// let promise = new Promise((resolve) => {
//  setTimeout(() => {
//      resolve("we did it!!!");
//  }, 2000);
//   // executor (the producing code, "singer")
// });

// promise.then(
//     (result) => { 
//         console.log('mk money ' + result);
//     }
// );

// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms), reject => alert('rejext'));
// }

// delay(3000).then(() => alert('runs after 3 seconds'));


const sumz = (max) => {
    let sum = 0;

    for (i = 3; i <= max; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            sum = sum + i;
        }
    }

    return sum
}


console.log(sumz(1000));