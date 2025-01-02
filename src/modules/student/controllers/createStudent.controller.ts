import { Request, Response } from 'express';
import { auth } from '@middleware/auth';
import { joiValidation } from '@middleware/joiValidation';
import { CreateStudentSchema } from '@student/schemas/createStudent.schema';
import { studentService } from '@services/db/student.service';
import { BadRequestError } from '@services/utils/errorHandler';
import { userService } from '@services/db/user.service';

export class CreateStudentController {
  @auth('admin')
  @joiValidation(CreateStudentSchema)
  public async createStudent(req: Request, res: Response): Promise<void> {
    const {} = req.body;
    const user = await studentService.getStudentById(req.body.studentId);
    if (user) {
      throw new BadRequestError('Student id already in use.', 409);
    }

    const newUser = await userService.createUser(req.body);

    res.status(201).json({
      message: 'Create a student',
      user: newUser
    });
  }

  @auth('admin')
  @joiValidation(CreateStudentSchema)
  public async updateStudent(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      throw new BadRequestError('Id required', 400);
    }
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);

    res.status(200).json({
      message: 'Updated student',
      data: updatedStudent
    });
  }

  @auth('admin')
  public async deleteStudent(req: Request, res: Response): Promise<void> {
    if (!req.params.id) {
      throw new BadRequestError('Id required', 400);
    }

    await studentService.deleteStudent(req.params.id);

    res.status(200).json({
      message: 'Deleted student'
    });
  }
}
