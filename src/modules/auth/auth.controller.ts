import { Bcrypt } from "../../helpers/bcrypt.helper";
import { JwtHelper } from "../../helpers/jwt.helper";
import { CreateUserDto } from "./dto/createUser.dto";
import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/user.entity"
import { Role } from "../../entities/role.entity";
interface AuthRequest extends Request {
  user?: any;
}

interface User {
  firstName?: string
  lastName?: string
  email?: string
  role?: Number
  password?: string
  confirmPassword?: string
}

export class AuthController {
  public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

      //req.body - firstName, lastName, email, password, roleId
      // chech whether the user is already registered or not
      // chech whether the roleId is present correct or not
      // encrypt the password and apply validation to password and confirm password
      // generate the token
      // save the data to database
      // send the response

      const { firstName, lastName, email, password, confirmPassword, role } = req.body;

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        return res.status(400).json({ msg: "User already exists" });
      }
     
      const roleExist = await Role.findOne({ role: role });
      if(!roleExist){
        return res.status(400).json({ msg: "Role does not exist" });
      }
      if(password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
      }

      const encryptPassword = await Bcrypt.hash(password);
      if (!encryptPassword) {
        return res.status(400).json({ msg: "Password encryption failed" });
      }

      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: encryptPassword,
        role: roleExist._id,
      }
      
      const RegistetedUser = new User(user);
      await RegistetedUser.save();
      const token = JwtHelper.encode({ id: RegistetedUser.id });


      return res.status(201).json({ msg: "User created successfully", token });
    } catch (error) {
      console.error("Signup error:", error);
      next(error); 
    }
  };

public signIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {

    // req body - email, password
    // check if the user is registered or not
    // decode password and check whether it correct or not 
    // generate the token
    // send the response

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email});

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const isPasswordValid = await Bcrypt.verify(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = JwtHelper.encode({ id: user.id });
    return res.status(200).json({ msg: "User signed in successfully", token, user });
  } catch (error) {
    console.error("Sign-in error:", error);
    next(error);
  }
};

public logout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try{
    // req headers - token
    // check if the token is present or not
    // check if the token is valid or not
    // send the response
    const token = req.headers.authorization?.split(" ")[2];
    console.log("Authorization:", req.headers.authorization);
    if(!token){
      return res.status(401).json({msg: "Unauthorized: No token provided"});
    }
    const isTokenValid = JwtHelper.decode(token);
    if(!isTokenValid){
      return res.status(401).json({msg: "Unauthorized: Invalid or expired token"});
    }
    return res.status(200).json({msg: "User logged out successfully"});
  }catch(error){
    console.error("Logout error:", error);
    next(error);
  }
}

public deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try{
    // req params - userId
    // check if the user is registered or not
    // check if the user is authorized or not
    // delete the user
    //send the response
    const userId = req.params.userId;
    const token = req.headers.authorization?.split(" ")[2];
    if(!token){
      return res.status(401).json({msg: "Unauthorized: No token provided"});
    }
    const isUser = await User.findOne({_id: userId});
    if(!isUser){
      return res.status(404).json({msg: "User not found"});
    }
    const isTokenValid = JwtHelper.decode(token);
    if(!isTokenValid){
      return res.status(401).json({msg: "Unauthorized: Invalid or expired token"});
    }

      const user = await User.deleteOne({_id: userId});
      if(!user){
        return res.status(404).json({msg: "User is not deleted"});
      }
      return res.status(200).json({msg: "User deleted successfully"});

  }catch (error){
    console.error("Delete user error:", error);
    next(error);
  }
}

public updateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try{
    // req body - firstName, lastName, email, password (not cumplusory)
    // req params - userId for checking the user
    // check if the user is registered or not
    // check if the user is authorized or not
    // check role is exist in roles database or not
    // encrypt the password and apply validation to password and confirm password
    // send the response
    const userId = req.params.userId;
    const {firstName, lastName, email, role, password, confirmPassword} = req.body;

    if (!firstName && !lastName && !email && !role && (!password || !confirmPassword)) {
      return res.status(400).json({ msg: "At least one of the fields (firstName, lastName, email, role, password, confirmPassword) is required" });
    }

    const user = await User.findOne({_id: userId});
    if(!user){
      return res.status(404).json({msg: "User not found"});
    }

    let updatedUser: Partial<User> = {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
    };

    if (role) {
      const roleData = await Role.findOne({ role });
      if (!roleData) {
      return res.status(400).json({ msg: "Invalid role" });
      }
      updatedUser.role = roleData._id;
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
      }
      updatedUser.password = await Bcrypt.hash(password);
    }

    console.log("updateduser..", updatedUser)

    const updateUser = await User.findOneAndUpdate(updatedUser);
    await updateUser.save();
    return res.status(200).json({msg: "User updated successfully"});

  }catch (error){
    console.error("Update user error:", error);
    next(error);
  }
}
}
