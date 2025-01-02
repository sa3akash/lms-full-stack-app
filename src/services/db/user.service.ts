import {userModel} from "@admin/auth/auth.model";
import {IUserDocument} from "@admin/auth/auth.interface";


class UserService {
    public async getUserById(id: string):Promise<IUserDocument | null> {
        return userModel.findById(id);
    }
}

export const userService = new UserService();