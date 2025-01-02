import {NextFunction, Request, Response} from "express";
import {SignUpSchema} from "@admin/auth/auth.schema";
import {joiValidation} from "@middleware/joiValidation";

export class AuthController {

    @joiValidation(SignUpSchema)
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {

        console.log(req.body);

        res.status(201).json({
            message: 'Register user',
        })
    }
}