import { Role } from "../../../entities/role.entity";
// import {Role} from "@entities/role.entity";
import { NextFunction, Request, Response } from "express";

export class RoleController {
    public createRole = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // req body
            // check if role already exists
            // save to database
            // send response

            const { role } = req.body;
            const roleExist = await Role.findOne({ role: req.body.role });
            if(roleExist){
                return res.status(400).json({ msg: "Role already exists" });
            }

            const roleData = {
                role: role,
            }

            const createRole = new Role(roleData);
            await createRole.save();

            return res.status(201).json({ msg: "Role created successfully", createRole });

        }catch (err){
            console.error("Create role error:", err);
            next(err);
        }
    }

    public getRole = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // fetch all role 
            // return response

            const roles = await Role.find({});
            if(!roles){
                return res.status(400).json({ msg: "No roles found" });
            }

            return res.status(200).json({ msg: "Roles fetched successfully", roles });
        }catch (err){
            console.error("Get role error:", err);
            next(err);
        }
    }
}