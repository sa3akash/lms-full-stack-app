import { Request, Response } from 'express';
import { joiValidation } from '@middleware/joiValidation';
import { ServerError } from 'error-express';
import { auth } from '@middleware/auth';
import { CreateSchema } from '@admin/schemas/class.schema';
import { classModel } from '@admin/models/class.model';

export class ClassController {
  @auth('admin', 'moderator')
  @joiValidation(CreateSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { className } = req.body;

    const existingSubject = await classModel.findOne({
        className
    });

    if (existingSubject) {
      throw new ServerError('Class name already in use.', 409);
    }

    const createClass = await classModel.create({
      className
    });

    res.status(200).json({
      message: 'create class successfully',
      data: createClass
    });
  }

  @auth('admin', 'moderator')
  @joiValidation(CreateSchema)
  public async update(req: Request, res: Response): Promise<void> {
    const { className } = req.body;
    const id = req.params.id;

    if (!id) {
      throw new ServerError('id params are required', 400);
    }

    const updateClass = await classModel.findByIdAndUpdate(
      id,
      {
        className:className.toLowerCase()
      },
      { new: true }
    );

    res.status(200).json({
      message: 'updated class successfully',
      data: updateClass
    });
  }

  @auth('admin', 'moderator')
  public async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!id) {
      throw new ServerError('id params are required', 400);
    }

    await classModel.findByIdAndDelete(id);

    res.status(200).json({
      message: 'class delete successfully'
    });
  }

  @auth('admin', 'moderator')
  public async getSingle(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (!id) {
      throw new ServerError('id params are required', 400);
    }

    const studentGrade = await classModel.findById(id);

    res.status(200).json({
      message: 'get single',
      data: studentGrade
    });
  }

  @auth('admin', 'moderator', 'teacher', 'student')
  public async getAll(req: Request, res: Response): Promise<void> {
    const studentGrade = await classModel.find({});

    res.status(200).json({
      message: 'get all',
      data: studentGrade
    });
  }
}
