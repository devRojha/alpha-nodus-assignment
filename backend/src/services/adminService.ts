import jwt from "jsonwebtoken";
import type { AdminSigninResponse } from "../types/admin.js";
import dotenv from "dotenv"
dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET!;



export const adminSignin = (data: { email: string; password: string }): AdminSigninResponse => {

    if (data.email === adminEmail && data.password == password) {

        const token = jwt.sign(
        { adminId : data.email, role: "ADMIN" },
        JWT_SECRET,
        { expiresIn: "1d" }
        );

        return {
            success: true,
            message: "Login successful",
            token: "Bearer " + token
        };
    }

    return {
        success: false,
        message: "Credentials failed"
    };
};
