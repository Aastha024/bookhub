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

    public updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            //req body - name
            // req parmas - id
            // check category already exists if not then then return 
            // update category
            // return response

            const { name } = req.body;
            const categoryId = req.params.id;

            const category = await Category.findOne({ _id: categoryId });
            if(!category){
                return res.status(400).json({ msg: "Category not found" });
            }

            const categoryExist = await Category.findOne({ name: name });
            if(categoryExist){
                return res.status(400).json({ msg: "Category already exists" });
            }
         
            const updatedCategory = await Category.findByIdAndUpdate({ _id: categoryId }, {name: name},  { new: true, runValidators: true });

            return res.status(200).json({ msg: "Category updated successfully", category: updatedCategory });
          
        }catch (err){
            console.error("Update role error:", err);
            next(err);
        }
    }

    public deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try{
            // req params - id
            // check if category exists
            // delete category
            // return response

            const categoryId = req.params.id;
            const category = await Category.findOne({ _id: categoryId });

            if(!category){
                return res.status(400).json({ msg: "Category not found" });
            }

            const deletedCategory = await Category.findByIdAndDelete({ _id: categoryId });

            return res.status(200).json({ msg: "Category deleted successfully", category: deletedCategory });
        }catch (error) {
            console.error("Delete role error:", error);
            next(error);
        }
    }
}