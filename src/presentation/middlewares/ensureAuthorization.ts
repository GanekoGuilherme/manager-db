import { Request, Response, NextFunction } from "express";
import { AUTH } from "../../data/config/constants";

export default async function ensureAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  if (!AUTH || req.headers.authorization !== AUTH)
    return res.status(401).json({ message: "Operação não autorizada." });

  return next();
}
