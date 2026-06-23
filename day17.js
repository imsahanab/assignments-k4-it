
//why destructuring?
//destructuring is a convenient way of extracting values from arrays or objects and assigning them to variables. it allows us to unpack values from arrays or properties from objects into distinct variables in a more concise and readable way. it can be used in various 
// scenarios such as when we want to extract specific values from an array or object, when we want to assign default values to variables, when we want to swap values between variables, etc. destructuring can make our code cleaner and easier to understand by
//  reducing the need for repetitive code and making it clear which values we are working with.




// <---1...array destructuring--->used to extract values based on  their position and assign it to vaeriable.
//arrays are ordered list of values and we can access them using any word but its index based 
const arr=[1,2,3,4];
// const[first, ,second]=arr;// to skip the values we use that empty commas space.
const [first,second, three,four, ...meedhi]=arr;
console.log(first)//1
console.log(second)//2
console.log(four)//4
console.log(three)//3
console.log(meedhi)
//[] meedhi is empty because we have only 4 values in the array and we have already assigned them to first, second, three and four. so there is no value left for meedhi. if there were more values in the array then meedhi would have been an array of those remaining values.

//<---object destructuring--->
//objects are unordered collection of key value pairs and we can access them using their keys but its not index based.


//without destructuring

const user = {
  id1: 1,
  name1: "Sahana",
  city: "Chennai"
};

const id1 = user.id1;
const name1 = user.name1;
const city = user.city;


//<---with destructuring--->

const saha={
    name:"saha",
    age:21,
    country:"india"
}
// const {en_peru,en_vayasu,en_ooru}=saha
// console.log(en_ooru);
// console.log(en_peru);

// the above lines gives undefined as op
//because in object while destructuring we shld compulsorily use object properties names 
//so to fix the error we shld use the same property names as in the object .
const{name,country,age}=saha;
console.log(name);
console.log(country);
console.log(age);

-------------------------------------------------------------------------------------------------------------------------------------------


const express=require('express');
const app=express();
app.use(express.json());//body read  and used to read user data without this we cant read the data sent by user in postman or any other client. 
//it is a middleware that parses incoming JSON requests and puts the parsed data in req.body so that we can access it in our route handlers. without this middleware, req.body would be undefined 
// when we try to access it, and we wouldnt be able to read the data sent by the user in the request body.
app.post("/customers",(req,res)=>{
    
console.log(req.body);
const{name,city,age}=req.body;
console.log(name);
console.log(city);
console.log(age);

res.send("received");

})

app.get("/customers/:id",(req,res)=>{
    console.log(req.params);//to receive data
    const {id}=req.params;
    console.log(id);
    
    res.send ("done");
})

app.get("/customers",(req,res)=>{
    console.log(req.query);
    res.send("query received");
    const { page, limit } = req.query;

console.log(page);
console.log(limit);
})



app.listen(3000,()=>
{
    console.log("server is running  ");
})
