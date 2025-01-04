import express from 'express';
import { CreateStudentController } from '@student/controllers/createStudent.controller';

class StudentRoute {
  private readonly router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  public routes(): express.Router {
    this.router.post('/create', CreateStudentController.prototype.createStudent);
    this.router.put('/update/:id', CreateStudentController.prototype.updateStudent);
    this.router.delete('/delete/:id', CreateStudentController.prototype.deleteStudent);
    this.router.get('/single/:id', CreateStudentController.prototype.getSingleStudentDetails);
    this.router.get('/', CreateStudentController.prototype.getAllStudents);

    return this.router;
  }
}

export const studentRoute: StudentRoute = new StudentRoute();
