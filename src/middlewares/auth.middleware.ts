import { Request, Response, NextFunction } from "express";
import { UserRole } from "src/models/user.model";
import { UserService } from "../services/user.service";
import { AuthUtil } from "../utils/auth.util";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw "not authorized";
    const role = await getRole(authHeader);
    if (role !== UserRole.Admin) throw "not admin";
  } catch (error) {
    console.log(error);
  }
  next();
};

const isUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw "not authorized";
    const role = await getRole(authHeader);
    if (role !== UserRole.User) throw "not user";
  } catch (error) {
    console.log(error);
  }
  next();
};

const getRole = async (authInfo: string): Promise<string | null> => {
  const jwtoken = authInfo.split(" ")[1];
  const jwtPayload = await AuthUtil.getJwtPayload(jwtoken);
  if (!jwtPayload) return null;
  const user = await UserService.findById(jwtPayload.id as string);
  if (!user) return null;
  return user.role;
};

export const AuthMiddleware = { isAdmin, isUser };
