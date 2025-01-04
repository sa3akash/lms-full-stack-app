import { Request, Response } from 'express';
import { auth } from '@middleware/auth';
import { joiValidation } from '@middleware/joiValidation';
import { CreateStudentSchema, updateStudentSchema } from '@student/schemas/createStudent.schema';
import { studentService } from '@services/db/student.service';
import { BadRequestError } from '@services/utils/errorHandler';

const PAGE_SIZE = 10;

export class CreateStudentController {
  @auth('admin')
  @joiValidation(CreateStudentSchema)
  public async createStudent(req: Request, res: Response): Promise<void> {
    const user = await studentService.getStudentById(req.body.studentId);
    if (user) {
      throw new BadRequestError('Student id already in use.', 409);
    }

    const newUser = await studentService.createStudent(req.body);

    res.status(201).json({
      message: 'Create a student',
      user: newUser
    });
  }

  @auth('admin')
  @joiValidation(updateStudentSchema)
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

  @auth('admin', 'moderator', 'teacher')
  public async getAllStudents(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const skip: number = (page - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * page;

    const allStudents = await studentService.getAllStudents(skip, limit);

    res.status(200).json({
      message: 'get all students',
      data: allStudents
    });
  }

  @auth('admin', 'moderator', 'teacher')
  public async getSingleStudentDetails(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestError('Id required', 400);
    }

    const user = await studentService.getSingle(id);

    res.status(200).json({
      message: 'Get post details',
      data: user
    });
  }
}
