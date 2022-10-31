import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    phone:{
        type: String,
        minLength:10
    } , 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        MinLength:8
    },
   
})

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
   
})

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
})

let Users = mongoose.model("Users", userSchema)
let Contact = mongoose.model("Contact", contactSchema)
let Newsletter = mongoose.model("Newsletter", newsletterSchema)

export {
    Users,Contact,Newsletter
}
