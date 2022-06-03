import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";
import mongoose from "mongoose";
import UserModal from "../models/user.js";
const secret = "test";

export const signin = async (req, res) => {
    const {email, password } = req.body;

    try{
        const oldUser = await UserModal.findOne({email});
        if(!oldUser)
         return res.status(404).json({ message:"User doesn't exist"});
       const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
       
       if(!isPasswordCorrect)
         return res.status(400).json( {message:"Invalid credentials"});

       const token = Jwt.sign({ email: oldUser.email, id: oldUser._id }, secret,{expiresIn:"24h"});
       
       res.status(200).json({result: oldUser,token});
        
    }catch(error){
       res.status(500).json({ message: "Something went wrong"});
       console.log(error);
    }
}

export const signup = async (req, res) => {
    const {email,password, firstName, lastName, isManager, isCashier, creator} = req.body;
    
    try{
        const oldUser = await UserModal.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashePassword = await bcrypt.hash(password,12);

        const result = await UserModal.create({
            email,
            isManager,
            isCashier,
            password:hashePassword,
            name:`${firstName} ${lastName}`,
            creator:creator
        });

        const token = Jwt.sign({email:result.email,id: result.id},secret,{expiresIn:"1h"})
        res.status(201).json({result,token})
    }catch(error){
        res.status(500).json({message:"something went wrong"});
        console.log(error);
    }
}


export const getEmployee = async (req, res) => {

  try{
      const employee = await UserModal.find();
        res.status(200).json({result: employee});
  }catch(error){
        res.status(404).json({ message:"Something went wrong"}); 
 
  }
}

export const deleteEmployee = async (req, res) => {
  const {id} = req.params;
  try {
      if(!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: `No Employee exist with id: ${id}` });
      }else{
          await UserModal.findByIdAndRemove(id);  
          res.status(200).json({ message: "Employee delete successfully.!"});
      }  
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


export const googleSignIn = async (req, res) => {
    const { email, name, token, googleId } = req.body;
  
    try {
      const oldUser = await UserModal.findOne({ email });
      if (oldUser) {
        const result = { _id: oldUser._id.toString(), email, name };
        return res.status(200).json({ result, token });
      }
  
      const result = await UserModal.create({
        email,
        name,
        googleId,
      });
  
      res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };