import type { Response } from "express";

export const getErrorResponse = (res: Response, err: unknown) => {
  console.error("Error:", err);

  if (err instanceof Error) {
    return res.status(500).json({ error: err.message });
  }

  return res.status(500).json({ error: "Something went wrong" });
};
