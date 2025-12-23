import jwt from "jsonwebtoken";

const adminEmail = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET!;

interface AdminSigninResponse {
  success: boolean;
  message: string;
  token?: string;
}


export const adminSignin = (data: { email: string; password: string }): AdminSigninResponse => {
  if (data.email === adminEmail && data.password === password) {
    const token = jwt.sign(
      { role: "ADMIN" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      success: true,
      message: "Login successful",
      token
    };
  }

  return {
    success: false,
    message: "Credentials failed"
  };
};
