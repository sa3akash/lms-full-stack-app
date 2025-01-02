import {NextFunction, Request, Response} from "express";
import {BadRequestError} from "@services/utils/errorHandler";
import {jwtService} from "@services/utils/jwt.services";
import {userService} from "@services/db/user.service";


export type Role = 'admin' | 'student' | 'teacher';

export function auth(...roles: Role[]):MethodDecorator{
    return (target, key, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function(...args: any[]): Promise<any> {
            const [req, res, next] = args as [Request, Response, NextFunction];
            const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

            if(!token){
                throw new BadRequestError("Unauthorized: No token provided", 400);
            }

            const tokenValue = jwtService.verifyToken(token) as {userId:string};
            if(!tokenValue){
                throw new BadRequestError("invalid token", 401);
            }

            const user = await userService.getUserById(tokenValue.userId);
            if(!user){
                throw new BadRequestError("invalid user", 404);
            }

            req.user = user;

            if (roles.length > 0 && !roles.includes(user.role)) {
                throw new BadRequestError("Forbidden: Insufficient permissions", 403); // Use 403 for forbidden access
            }

            return originalMethod.apply(this, args);
        }

        return descriptor;
    }
}