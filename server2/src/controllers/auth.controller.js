import User from "../models/user.model.js";
import bcript from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from "../config.js";


//==============================================================================//
//                                  REGISTER                                    //
//==============================================================================//
export const register = async (req, res) => {
  const { username, fname, lname, email, password, access, color } = req.body;

  try {

    const userFound = await User.findOne({ username });
    if(userFound) {
      return res.status(400).json(["User already exists" ]);
    }
    const emailFound = await User.findOne({ email });
    if(emailFound) {
      return res.status(400).json(["Email already exists"] );
    }

    const salt = await bcript.genSalt(10);
    const hashs = await bcript.hash(password, salt);

    const newUser = new User({
      username,
      fname,
      lname,
      email,
      password: hashs,
      access,
      color,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });    
    res.cookie("token", token);
    res.status(200).json(["User registered successfully"]);

  } catch (error) {
    res.status(500).json([error.message]);
  }
};

//==============================================================================//
//                                  LOGIN                                       //
//==============================================================================//
export const login = async (req, res) => {
    const { username,password } = req.body;
  
    try {
      const userFound = await User.findOne({ username });
      if (!userFound) {
        return res.status(404).json(["User not found" ]);
      }

    
      const isMatch = await bcript.compare(password, userFound.password);

      if (!isMatch) {
        return res.status(400).json(["Invalid credentials"]);
      }  
          
      const token = await createAccessToken({ id: userFound._id });
      res.cookie("token", token);
      const data = {
        id: userFound._id,
        fname: userFound.fname,
        lname: userFound.lname,
        access: userFound.access,
        color: userFound.color,
      }      
      res.status(200).json(data);
  
    } catch (error) {
      res.status(500).json([error.message]);
    }
  };


//==============================================================================//
//                                  LOGOUT                                      //
//==============================================================================//

export const logout =  (req, res) => {
  res.cookie("token","",{
    expires: new Date(0),
  });
  return res.sendStatus(200);
}


//==============================================================================//
//                                  PROFILE                                     //
//==============================================================================//

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  
  if (!userFound) {
    return res.status(404).json(["User not found"]);
  }  
    return res.status(200).json({id: userFound._id,fname: userFound.fname, lname: userFound.lname, access: userFound.access}); 
}


export const verify =  async (req, res) => {
  
  const {token} = req.cookies;
  
  
  if (!token)return res.status(401).json(['Authorization denied']);

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {

    if (err) return res.status(401).json(['Invalid token']);

    const userFound = await User.findById(user.id);    
    if (!userFound) return res.status(404).json(['User not found']);
    
    return res.status(200).json({
      id: userFound._id,
      fname: userFound.fname,
      lname: userFound.lname,
      access: userFound.access,
      color: userFound.color,
    });
    
  });
}


export const getUsers = async (req, res) => {  
    const userFound = await User.find({},'_id fname lname username email color');
    // console.log(userFound);
    if (!userFound) {
      return res.status(401).json(["Users not found"]);
    }  
      return res.status(200).json(userFound); 
  
}



export const deleteUser = async (req, res) => {
  const { id } = req.params;  // Suponiendo que el ID del usuario se pasa como parámetro en la URL
  
  try {
    const userFound = await User.findById(id);
    if (!userFound) {
      return res.status(404).json(["User not found"]);
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json(["User deleted successfully"]);
    
  } catch (error) {
    res.status(500).json([error.message]);
  }
};