import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {errorHandler} from "../utils/error.js";


export const signup = async (req,res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json({message: "User created successfully!"});
    }catch(err){
        next(err);
    }

};

export const signin = async (req,res,next) => {
    const {username, password} = req.body;
    try{
        const validUser = await User.findOne({username});
        if (validUser){
            const validPassword = bcryptjs.compareSync(password, validUser.password);
            if(validPassword){
                //validUser._id is a unique id that mongodb automatically created for each user
                const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
                const {password: hashedPassword, ...rest} = validUser._doc;
                const expiryDate = new Date((Date.now() + 3600000)*24); // 24 Hours
                res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);
            }else{
                return next(errorHandler(401, "Username or password is incorrect!"));
            }
        }else{
            return next(errorHandler(401, "Username or password is incorrect!"));
        }
        
        
        
        

    }catch (error){
        next(error);
    }
}