import auth from "../config/firebase-config";
import { Request, Response, NextFunction } from "express";
// declare module "express" {
//   export interface Request {
//     user: any;
//   }
// }

export const VerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // parses the token from the authorization header
  const token = req.headers.authorization?.split(" ")[1]!; // bearer ${token}

  try {
    const decodedInformationAboutTheUser = await auth.verifyIdToken(token);
    if (decodedInformationAboutTheUser) {
      req.user = decodedInformationAboutTheUser;
      return next();
    }
  } catch (e) {
    return res.json({ message: "Internal Error" });
  }
};
