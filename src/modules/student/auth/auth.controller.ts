import {NextFunction, Request, Response} from "express";


export class AuthController {
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {

        console.log(req.body);

        res.status(201).json({
            message: 'Register user',
        })
    }
}