import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
  console.log("insisde middlewaer ");
  //@ts-ignore
  const token = req.headers["authorization"] ?? "";

  console.log(token);
  const decoded = jwt.verify(token, JWT_SECRET);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //@ts-ignore
    console.log(decoded.userId);
    //@ts-ignore
    req.userId = decoded.userId;
    console.log("going for further call ");
    next();
  } catch (e) {
    //@ts-ignore
    res.status(403).json({
      message: "there is some error ",
    });
  }
}
