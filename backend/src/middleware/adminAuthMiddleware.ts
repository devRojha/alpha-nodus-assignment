import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt.js";

export const adminAuthMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not configured");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // attach admin info to request (optional)
    req.admin = decoded;

    next();
  } 
  catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
