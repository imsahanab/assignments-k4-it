// 1. stream--> breaking large size of data into small to avoid waiting for a long time eg : netflix , youtube, movie
 //.on(),.end(),.destroy(),data,error,end comes inside parameters of .on()
  
 //1st eg for small text file:
const fs=require("fs");
fs.readFile("./smallfile.txt", 'utf-8', (err,data)=>{
    if (err){
        console.log("error");
    return;}
            console.log(data);
} );

//2nd eg: for large text file
const fs=require("fs");
fs.readFile("./large.txt", 'utf-8', (err,data)=>{
    if (err){
        console.log("error");
    return;}
            console.log(data);
    });

//3rd eg for counting chunk size.
const fs = require("fs");

const stream =
fs.createReadStream("./sample.txt");

stream.on("data",(chunk)=>{

    console.log(
      "Chunk Size:",
      chunk.length
    );

});

//2. event loop
const fs = require("fs");

console.log("Start");

fs.readFile("smallfile.txt", "utf8", (err, data) => {
  console.log(data);
});

console.log("End");

//4. lexical scope : a function can access variables based on where it is written in the code not where it is called.
//ii) inner fn can access outer fn variable but outer fn cant access properties or variables inside child or inner class of its..
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message);
  }
inner();
}

outer();

//5. promise: in this 1st synchronous(immediate) get executed then nextticks(urgent) micro tasks then macro tasks gets executed.
console.log("Start");//--> synchronous fn

process.nextTick(() => {//-->urgent execution after sync
  console.log("nextTick");
});

Promise.resolve().then(() => { //after next tick promise comes in priority
  console.log("Promise");
});

setTimeout(() => { //timer fn always executes after sync,promise,nextticks
  console.log("Timer");
}, 0);

setImmediate(() => {//  --> once cycle finishes it runs .. like it executes once everything finishes in the current cycle.}
  console.log("Immediate");
});

console.log("End");//--> sync
// outp// start -->end-->nexttick-->promis-->timer-->immediate.


//error handling: 

// Callback Error	--if (err)
function Callback(error, result)
{
if(error)
{ //handle the error
  console.log(error);
}else{

//success 
  console.log("coorect");
}  
  
}



// // Promise Error	---.catch()

const promise = Promise.reject(
  new Error("Database failed")
);

promise.catch(err => {
  console.log(err.message);
});



// // Async/Await Error--	try...catch

async function getUser() {
  throw new Error("User not found");
}

async function main() {
  try {
await getUser();
  } catch (err) {
    console.log(err.message);
  }
}

main();
