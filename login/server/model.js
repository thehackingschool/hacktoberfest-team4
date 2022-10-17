import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    phone:{
        type: Number,
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

export default mongoose.model("User", userSchema)