import { Request, Response, NextFunction } from "express";
import { JwtHelper } from "../helpers/jwt.helper"; // Import the JWT helper

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[2]; 
    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decoded = JwtHelper.decode(token);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
