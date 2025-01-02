import express from 'express';
import { AuthController } from '../controllers/auth.controller';

class AdminRoute {
  private readonly router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): express.Router {
    this.router.post('/register', AuthController.prototype.register);
    this.router.post('/login', AuthController.prototype.login);

    return this.router;
  }
}

export const adminRoute: AdminRoute = new AdminRoute();
