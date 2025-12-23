export interface JwtPayload {
  adminId: string;
  role: "ADMIN" | "USER";
}
