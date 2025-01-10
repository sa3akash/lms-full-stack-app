import express from 'express';
import { ClassController } from '@admin/controllers/class.controller';

class ClassRoute {
  private readonly router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): express.Router {
    this.router.post('/create', ClassController.prototype.create);
    this.router.put('/update', ClassController.prototype.update);
    this.router.delete('/delete/:id', ClassController.prototype.delete);
    this.router.get('/get/:id', ClassController.prototype.getSingle);
    this.router.get('/get/all', ClassController.prototype.getAll);

    return this.router;
  }
}

export const classRoute: ClassRoute = new ClassRoute();
