import { Roles } from "../types/types";
import { Request, Response, NextFunction } from "express";

export class MiscController {
  public roles = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    return res.status(200).json({ msg: "Roles fetched successfully", roles: Roles });
  }
}
