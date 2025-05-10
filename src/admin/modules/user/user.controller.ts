import { User } from "@entities/user.entity";
import { Category } from "../../entities/category.entity";
import { Role } from "../../entities/role.entity";
// import {Role} from "@entities/role.entity";
import { NextFunction, Request, Response } from "express";
import { UserRole } from "@entities/userRole.entity";

export class UserController {
    public getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // fetch all category 
            // return response

            const users = await User.find({});
            if(!users){
                return res.status(400).json({ msg: "No users found" });
            }

            return res.status(200).json({ msg: "Roles fetched successfully", users });
        }catch (err){
            console.error("Get users error:", err);
            next(err);
        }
    }

    public getUserByRole = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // req body - role
            // check if role exists
            // fetch all users by role
            // return response


        }catch (error){
            console.error("Get users by role error:", error);
            next(error);
        }
    }

    public updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => { //pending
        try{
            //req body - firstName, lastName, role, 
            // req parmas - id
            // check user already exists if not then then return 
            // update user
            // return response

            const { firstName, lastName, role } = req.body;
            const userId = req.params.id;

            const user = await User.findOne({ _id: userId });
            if(!user){
                return res.status(400).json({ msg: "User not found" });
            }

            const updatedUserobj = {
                firstName: firstName || user.firstName,
                lastName: lastName || user.lastName,
            }
         
            const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updatedUserobj,  { new: true, runValidators: true });

            console.log("🚀 ~ UserController ~ updateUserProfile= ~ updatedUser:", updatedUser)
            if(role){
                const roleExist = await Role.findOne({ slug: role });
                if(!roleExist){
                    return res.status(400).json({ msg: "Role does not exist" });
                }
                console.log("🚀 ~ UserController ~ updateUserProfile= ~ roleExist:", roleExist)
                const userRoleData = { 
                    roleId: roleExist._id,
                }

                await UserRole.findOneAndUpdate({ userId: user._id }, userRoleData, { new: true, runValidators: true });
                
            }

            return res.status(200).json({ msg: "User updated successfully", user: updatedUser });
          
        }catch (err){
            console.error("Update role error:", err);
            next(err);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // req params - id
            // check if user exists
            // delete user
            // return response

            const userId = req.params.id;
            const user = await User.findOne({ _id: userId });

            console.log("🚀 ~ UserController ~ publicdeleteUser ~ user:", user)
            if(!user){
                return res.status(400).json({ msg: "User not found" });
            }

            const deletedUser = await User.findByIdAndDelete({ _id: userId });

            console.log("🚀 ~ UserController ~ publicdeleteUser ~ deletedUser:", deletedUser)
            return res.status(200).json({ msg: "User deleted successfully", category: deletedUser });
        }catch (error) {
            console.error("Delete role error:", error);
            next(error);
        }
    }
}