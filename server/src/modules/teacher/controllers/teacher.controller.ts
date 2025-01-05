import { Request, Response } from 'express';

export class TeacherController {
  public async register(req: Request, res: Response): Promise<void> {
    console.log(req.body);

    res.status(201).json({
      message: 'Register user'
    });
  }
}
