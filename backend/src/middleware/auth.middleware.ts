import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "No token, authorization denied.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    
    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!,
      (err, decoded: any) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: "Token is not valid or has expired.",
          });
          return;
        }

        req.user = {
          id: decoded.id,
          email: decoded.email,
        };
        next();
      }
    );
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server authentication error.",
    });
  }
};
