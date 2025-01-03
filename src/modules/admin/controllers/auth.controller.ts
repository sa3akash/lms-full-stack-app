import { Request, Response } from 'express';
import { ChangePasswordSchema, ResetPasswordSchema, SignInSchema, SignUpSchema, UpdateAdminSchema } from '@admin/schemas/auth.schema';
import { joiValidation } from '@middleware/joiValidation';
import { adminService } from '@services/db/admin.service';
import { BadRequestError } from '@services/utils/errorHandler';
import { jwtService } from '@services/utils/jwt.services';
import { config } from '@root/config';
import { generateToken, sendEmail } from '@services/utils/common';
import { auth } from '@middleware/auth';

export class AuthController {
  @joiValidation(SignUpSchema)
  public async register(req: Request, res: Response): Promise<void> {
    // const {name,email,password,phoneNumber} = req.body;

    if (req.body.email !== config.ADMIN_EMAIL) {
      throw new BadRequestError('Invalid email address', 400);
    }

    const axistUser = await adminService.getUserByEmail(req.body.email);

    if (axistUser) {
      throw new BadRequestError('User already exists', 400);
    }

    const user = await adminService.createUser(req.body);

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
    const user = await adminService.getUserByEmail(req.body.email);

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

  public async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError('Email are required', 400);
    }

    const user = await adminService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestError('User does not exist', 400);
    }

    const token = generateToken(20);
    await adminService.updateAdminResetToken(email, token);

    // send email
    await sendEmail(email, user.name, `http://localhost:3000/auth/reset-password?token=${token}`);

    res.status(200).json({
      message: 'Email send! check your email.'
    });
  }

  @joiValidation(ResetPasswordSchema)
  public async resetPassword(req: Request, res: Response): Promise<void> {
    const { token, password } = req.body;

    if (!token) {
      throw new BadRequestError('Token params are required', 400);
    }

    const user = await adminService.getUserByResetToken(token);

    if (!user) {
      throw new BadRequestError('Invalid token', 400);
    }

    if (new Date(user.updatedAt).getTime() + 15 * 60 * 1000 < Date.now()) {
      throw new BadRequestError('Time expired', 400);
    }

    const hashPassword = await user.hashPassword(password);
    await adminService.resetPassword(user.email, hashPassword);

    res.status(200).json({
      message: 'Password reset successfully'
    });
  }

  @auth('admin')
  @joiValidation(ChangePasswordSchema)
  public async changePassword(req: Request, res: Response): Promise<void> {
    const { newPassword, currentPassword } = req.body;

    const user = await adminService.getUserByEmail(`${req.user?.email}`);
    if (!user) {
      throw new BadRequestError('User does not exist', 404);
    }

    const checkPassword = await user.comparePassword(currentPassword);
    if (!checkPassword) {
      throw new BadRequestError('Current password does not match.', 400);
    }

    const hashPassword = await user.hashPassword(newPassword);

    await adminService.resetPassword(`${req.user?.email}`, hashPassword);

    res.status(200).json({
      message: 'Password change successfully'
    });
  }

  @auth('admin', 'moderator')
  public async getAllAdmin(req: Request, res: Response): Promise<void> {
    const allAdmin = await adminService.getAllAdmin();
    res.status(200).json({
      message: 'get all message',
      data: allAdmin
    });
  }

  @auth('admin', 'moderator')
  @joiValidation(UpdateAdminSchema)
  public async updateAdmin(req: Request, res: Response) {
    const { name, phoneNumber } = req.body;

    const updateUser = await adminService.updateAdmin(name, phoneNumber, `${req.user?._id}`);

    res.status(200).json({
      message: 'updated user',
      data: updateUser
    });
  }

  @auth('admin')
  public async changeRole(req: Request, res: Response): Promise<void> {
    const { role, id } = req.body;

    if (!role || !id) {
      throw new BadRequestError('all field are required.', 404);
    }

    if (`${id}` === `${req.user?._id}`) {
      throw new BadRequestError('You can not change your won role', 400);
    }

    const updatedUser = await adminService.changeRole(role, id);

    res.status(200).json({
      message: 'updated user role',
      data: updatedUser
    });
  }
}
