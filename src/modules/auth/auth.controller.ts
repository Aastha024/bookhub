import { Bcrypt } from "../../helpers/bcrypt.helper";
import { JwtHelper } from "../../helpers/jwt.helper";
import { CreateUserDto } from "./dto/createUser.dto";
import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/user.entity"
import { Role } from "../../entities/role.entity";
interface AuthRequest extends Request {
  user?: any;
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

      const { firstName, lastName, email, password, confirmPassword, roleId } = req.body;

      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const roleExist = await Role.findOne({ _id: roleId });
      if(roleExist){
        return res.status(400).json({ msg: "Role does not exist" });
      }
      if(req.body.password !== req.body.confirmPassword) {
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
        roleId: roleId,
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
    const user = await User.findOne({ email: req.body.email});

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    const isPasswordValid = await Bcrypt.verify(req.body.password, user.password);
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
    const token = req.headers.authorization?.split(" ")[2];
    if(!token){
      return res.status(401).json({msg: "Unauthorized access"});
    }
    return res.status(200).json({msg: "User logged out successfully"});
  }catch(error){
    console.error("Logout error:", error);
    next(error);
  }
}

public deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try{
    const userId = req.params.userId;
      const user = await User.findOneAndDelete({_id: userId});
      if(!user){
        return res.status(404).json({msg: "User not found"});
      }
      return res.status(200).json({msg: "User deleted successfully"});

  }catch (error){
    console.error("Delete user error:", error);
    next(error);
  }
}

public updateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try{
    const userId = req.params.userId;
    const user = await User.findOne({_id: userId});

    if(!user){
      return res.status(404).json({msg: "User not found"});
    }

    const hashedPassword = await Bcrypt.hash(req.body.password);
    req.body.password = hashedPassword;

    const updateUser = await User.findOneAndUpdate(req.body);
    await updateUser.save();
    return res.status(200).json({msg: "User updated successfully"});

  }catch (error){
    console.error("Update user error:", error);
    next(error);
  }
}
}
