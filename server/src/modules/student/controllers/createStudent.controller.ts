import { Request, Response } from 'express';
import { auth } from '@middleware/auth';
import { joiValidation } from '@middleware/joiValidation';
import { CreateStudentSchema, updateStudentSchema } from '@student/schemas/createStudent.schema';
import { studentService } from '@services/db/student.service';
import { BadRequestError } from '@services/utils/errorHandler';
import { studentModel } from '@student/models/createStudent.model';

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
    const numberOfStudent = await studentModel.find().countDocuments();

    res.status(200).json({
      message: 'get all students',
      data: allStudents,
      currentPage: Number(page),
      numberOfPages: Math.ceil(numberOfStudent / PAGE_SIZE)
    });
  }

  @auth('admin', 'moderator', 'teacher')
  public async getStudentsByClassName(req: Request, res: Response): Promise<void> {
    const page = Number(req.query.page) || 1;
    const skip: number = (page - 1) * PAGE_SIZE;
    const limit: number = PAGE_SIZE * page;

    const className = req.params.className;
    if (!className) {
      throw new BadRequestError('Class required', 400);
    }

    const allStudents = await studentModel.find({ class: className }).skip(skip).limit(limit);
    const numberOfStudent = await studentModel.find({ class: className }).countDocuments();

    res.status(200).json({
      message: 'get all students by class',
      data: allStudents,
      currentPage: Number(page),
      numberOfPages: Math.ceil(numberOfStudent / PAGE_SIZE)
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

  @auth('admin', 'moderator', 'teacher')
  public async searchStudents(req: Request, res: Response): Promise<void> {
    const search = req.query.search;

    if (!search) {
      throw new BadRequestError('Search not found', 404);
    }

    const data = await studentModel.find({
      $or: [{ studentId: { $regex: search } }, { studentName: { $regex: search } }]
    });

    res.status(200).json({
      message: 'Get post details',
      data: data
    });
  }
}
