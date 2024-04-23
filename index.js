const express= require("express")
const ConnectDB = require("./src/config/db")
const MoviesModal = require("./src/config/modal/Routes/movies.scema")
const moviesRouter = require("./src/config/modal/Routes/movies.Router")
const app=express()
app.use(express.json())



app.get('/',async(req,res)=>{
    res.send("this is our home route")
})

app.use("/movies",moviesRouter)
app.listen(8080,()=>{
    try {
        ConnectDB()
        console.log("We are connected to database");
        console.log("Server is Running");
    } catch (error) {
        console.log(err);
    }
   
})