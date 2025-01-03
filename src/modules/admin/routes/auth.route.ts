import express from 'express';
import { AuthController } from '@admin/controllers/auth.controller';

class AdminRoute {
  private readonly router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): express.Router {
    this.router.post('/register', AuthController.prototype.register);
    this.router.post('/login', AuthController.prototype.login);
    this.router.post('/forgot', AuthController.prototype.forgotPassword);
    this.router.put('/reset', AuthController.prototype.resetPassword);
    this.router.put('/change', AuthController.prototype.changePassword);
    this.router.put('/changeRole', AuthController.prototype.changeRole);
    this.router.put('/update', AuthController.prototype.updateAdmin);
    this.router.get('/', AuthController.prototype.getAllAdmin);

    return this.router;
  }
}

export const adminRoute: AdminRoute = new AdminRoute();
