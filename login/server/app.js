import express from "express";
import bodyParser from "body-parser";
import url from 'url';
import sendEmail from "./nodeMailer/index.js";
import User from "./model.js"

const app = express();
const port = 5000;

//__dirname
const __dirname = url.fileURLToPath(new URL('.',import.meta.url))

// app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname + "/login.html" )

})

app.post("/login",async (req,res)=>{
    let userdata=req.body;
    // console.log(req.body)
    await User.save(userdata)
    res.status(200).sendFile(__dirname+"./index.html")
})
app.get("/signup",(req,res)=>{
    res.sendFile(__dirname + "/signup.html" )

})

app.post("/signup",(req,res)=>{
    console.log(req.body)
})
app.get("/book",(req,res)=>{
    res.sendFile(__dirname + "/book.html" ) 

})

app.post("/book", (req, res) => {
    sendEmail(req.body)
    res.status(200).send("Email delivered successfully!")
  
});


app.listen(port, ()=>{
    console.log("the server is running at port ", port)
})
