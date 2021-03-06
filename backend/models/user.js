import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required: false},
    googleId:{type:String, required: false},
    id:{type:String},
    isMainAdmin:{type: Boolean,required: true,default: false}, 
    isManager:{type: Boolean,required: true,default: false}, 
    isCashier:{type: Boolean,required: true,default: false}, 
    creator:{type:String},
});

export default mongoose.model("User",userSchema);