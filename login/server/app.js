import express from "express";
import bodyParser from "body-parser";
import url from 'url';
import sendEmail from "./nodeMailer/index.js";
import mongoose from "mongoose";
import "./dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  Users,Contact,Newsletter
} from "./model.js"

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

app.post("/signup",async (req,res)=>{
    try{
        let { name, email, phone, password, password2 } = req.body;

        if(!name || !email || !phone ||  !password || !password2){
          return res.status(400).send("Some fields are missing")
        }
      
        if(password !== password2){
          return res.status(400).send("passwords are not equal")
        }

        let emailFound = await Users.findOne({email});
        if(emailFound){
            console.log(emailFound)
            return res.status(409).send("User email already exists, Please login");
        }
        let phoneFound = await Users.findOne({phone});
        if(phoneFound){
            return res.status(409).send("User phone already exists, please login")
        }

        password = await bcrypt.hash(password,12);

        let userdata={name, email,phone,password};

        // let userdata=req.body;
        // console.log(req.body)
        const User= new Users(userdata)
        await User.save()
        let mail = {subject: "Hello", to:email, html:"Welcome"}
        await sendEmail(mail)
        res.status(200).sendFile(__dirname+"./index.html")
    }catch(error){
        console.log(error)
        res.status(500).send("Internal server error")
    }
})
app.get("/signup",(req,res)=>{
    res.sendFile(__dirname + "/signup.html" )

})

app.post("/login",async(req,res)=>{
    // console.log(req.body)
    try {
        let {email,password} = req.body
        // console.log(email,password)
    
        if(!email || !password){
          return res.status(400).send("some fields are missing")
        }
    
    
        let userFound =await Users.findOne({email})
        // console.log(userFound)
        if(!userFound){
    
          return res.status(401).send("user not found, please sign up")
        }
    
        let matchedPassword = await bcrypt.compare(password, userFound.password)
        // console.log(matchedPassword)
        if(!matchedPassword){
          return res.status(401).send("Invalid Credentials")
        }
    
        let payLoad = {
          user_id: userFound._id,
          role: "user"
        }
    
        let privateKey = "cfi";
    
        
        const token = jwt.sign(payLoad,privateKey,{expiresIn:"7d"});
    
        // console.log(token)
    
        res.status(200).send("Login is successful")
    
    
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
      }
})

app.post("/newsletter", async(req,res)=>{
  try {
    let {email} = req.body
    let emailFound =await  Newsletter.findOne({email})
    if(emailFound) {
      return res.status(400).send("<h1> Already Subscribed! </h1>")
    } 
    let subscriber = new Newsletter({email})
    await subscriber.save();
    let mail = {subject: "Welcome :)", to:email, html:"Subscribed Successfully! "}
    await sendEmail(mail)
    return res.status(200).send("<h1> Subscribed Successfully! </h1>")


  } catch (error) {
    console.error(error);
        res.status(500).send("Internal server error")
  }
})

app.post("/contact", async(req,res)=>{  //contact us using message box
  try {
    let {name,email,subject,message} = req.body
    // let sender = new Contact(req.body)
    // let sender = new Contact (name,email,subject,message)
    console.log(req.body)
    let sender = new Contact ({
      name,email,subject,message
    })


    await sender.save();
    return res.status(200).send("<h1> Message Sent! </h1>")
  } catch (error) {
    console.error(error);
        res.status(500).send("Internal server error")
  }
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