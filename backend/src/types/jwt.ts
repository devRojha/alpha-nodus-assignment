export interface JwtPayload {
  adminEmail: string;
  role: "ADMIN" | "USER";
}
