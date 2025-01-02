import { Request, Response } from 'express';
import { SignInSchema, SignUpSchema } from '@admin/schemas/auth.schema';
import { joiValidation } from '@middleware/joiValidation';
import { userService } from '@services/db/user.service';
import { BadRequestError } from '@services/utils/errorHandler';
import { jwtService } from '@services/utils/jwt.services';
import { config } from '@root/config';

export class AuthController {
  @joiValidation(SignUpSchema)
  public async register(req: Request, res: Response): Promise<void> {
    // const {name,email,password,phoneNumber} = req.body;

    const axistUser = await userService.getUserByEmail(req.body.email);

    if (axistUser) {
      throw new BadRequestError('User already exists', 400);
    }

    const user = await userService.createUser(req.body);

    const accessToken = jwtService.signToken({ userId: user._id });

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: config.NODE_ENV === 'production' ? 'strict' : 'lax',
        secure: false
        // expires: new Date(Date.now() + 3600 * 60 * 60 * 1000),
      })
      .status(201)
      .json({
        message: 'Register user',
        accessToken,
        user
      });
  }

  @joiValidation(SignInSchema)
  public async login(req: Request, res: Response): Promise<void> {
    const user = await userService.getUserByEmail(req.body.email);

    if (!user || !(await user.comparePassword(req.body.password))) {
      throw new BadRequestError('Invalid credentials', 400);
    }

    const accessToken = jwtService.signToken({ userId: user._id });

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: config.NODE_ENV === 'production' ? 'strict' : 'lax',
        secure: false
        // expires: new Date(Date.now() + 3600 * 60 * 60 * 1000),
      })
      .status(201)
      .json({
        message: 'Login successfully',
        accessToken,
        user
      });
  }
}
