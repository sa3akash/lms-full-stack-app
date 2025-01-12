import express from 'express';
import { SubjectController } from '@admin/controllers/subject.controller';

class SubjectRoute {
  private readonly router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): express.Router {
    this.router.post('/create', SubjectController.prototype.addSubject);
    this.router.put('/update/:id', SubjectController.prototype.updateSubject);
    this.router.delete('/delete/:id', SubjectController.prototype.deleteSubject);
    this.router.get('/get/all', SubjectController.prototype.getAllSubject);
    this.router.get('/by-subject/:subjectName', SubjectController.prototype.getAllSubjectBySubjectName);
    this.router.get('/by-class/:className', SubjectController.prototype.getAllByClassNameName);
    this.router.get('/get/:id', SubjectController.prototype.getSingleSubject);

    return this.router;
  }
}

export const subjectRoute: SubjectRoute = new SubjectRoute();
