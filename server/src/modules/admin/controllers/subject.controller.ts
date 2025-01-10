import { auth } from '@middleware/auth';
import { Request, Response } from 'express';
import { SubjectSchema, UpdateSubjectSchema } from '@admin/schemas/subject.schema';
import { joiValidation } from '@middleware/joiValidation';
import { subjectModel } from '@admin/models/subject.model';
import { ServerError } from 'error-express';

export class SubjectController {
  @auth('admin')
  @joiValidation(SubjectSchema)
  public async addSubject(req: Request, res: Response) {
    const { subjectName, grade } = req.body;

    const alreadySubject = await subjectModel.findOne({
      subjectName: subjectName
    });

    if (alreadySubject) {
      throw new ServerError('Subject already exists', 400);
    }

    const createNew = await subjectModel.create({
      subjectName,
      grade
    });

    res.status(201).json({
      message: 'Subject created.',
      data: createNew
    });
  }

  @auth('admin')
  @joiValidation(UpdateSubjectSchema)
  public async updateSubject(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw new ServerError('Id required', 400);
    }

    const updated = await subjectModel.findByIdAndUpdate(id, {
      $set: req.body
    });

    res.status(200).json({
      message: 'Updated subject',
      data: updated
    });
  }

  @auth('admin')
  public async deleteSubject(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw new ServerError('Id required', 400);
    }

    await subjectModel.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Updated subject'
    });
  }

  @auth('admin', 'moderator', 'teacher')
  public async getSingleSubject(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      throw new ServerError('Id required', 400);
    }

    const getSingle = await subjectModel.findById(id);

    res.status(200).json({
      message: 'get single subject',
      data: getSingle
    });
  }

  @auth('admin', 'moderator', 'teacher')
  public async getAllSubject(req: Request, res: Response) {
    const getAll = await subjectModel.find();

    res.status(200).json({
      message: 'get single subject',
      data: getAll
    });
  }
}
