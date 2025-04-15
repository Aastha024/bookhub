import { Category } from "../../entities/category.entity";
import { Role } from "../../entities/role.entity";
// import {Role} from "@entities/role.entity";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
    public createCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // req body - name
            // check if category already exists
            // save to database
            // send response

            const { name } = req.body;
            const categoryExist = await Category.findOne({ name: name });
            if(categoryExist){
                return res.status(400).json({ msg: "Category already exists" });
            }

            const categoryData = {
                name: name,
            }

            const category = new Category(categoryData);
            await category.save();

            return res.status(201).json({ msg: "Category created successfully", category });

        }catch (err){
            console.error("Create role error:", err);
            next(err);
        }
    }

    public getCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // fetch all category 
            // return response

            const categories = await Category.find({});
            if(!categories){
                return res.status(400).json({ msg: "No roles found" });
            }

            return res.status(200).json({ msg: "Roles fetched successfully", categories });
        }catch (err){
            console.error("Get role error:", err);
            next(err);
        }
    }
}