import express from 'express';
import { TeacherController } from '@teacher/controllers/teacher.controller';

class TeacherRoute {
  private readonly router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): express.Router {
    this.router.post('/create', TeacherController.prototype.register);

    return this.router;
  }
}

export const teacherRoute: TeacherRoute = new TeacherRoute();
