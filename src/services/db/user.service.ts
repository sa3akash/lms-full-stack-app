import { userModel } from '@admin/models/auth.model';
import { IUserDocument } from '@admin/interfaces/auth.interface';
import { Role } from '@middleware/auth';

class UserService {
  public async getUserById(id: string): Promise<IUserDocument | null> {
    return userModel.findById(id);
  }

  public async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return userModel.findOne({
      email: email
    });
  }

  public async createUser({
    name,
    email,
    password,
    phoneNumber
  }: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }): Promise<IUserDocument> {
    return userModel.create({
      name,
      email,
      password,
      phoneNumber
    });
  }
}

export const userService = new UserService();
