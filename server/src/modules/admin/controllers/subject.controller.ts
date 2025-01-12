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
    const { subjectName, classId } = req.body;

    const alreadySubject = await subjectModel.findOne({
      subjectName: subjectName
    });

    if (alreadySubject) {
      throw new ServerError('Subject already exists', 400);
    }

    const createNew = await subjectModel.create({
      subjectName,
      classId
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

  @auth('admin', 'moderator', 'teacher')
  public async getAllSubjectBySubjectName(req: Request, res: Response) {
    const { subjectName } = req.params;
    if (!subjectName) {
      throw new ServerError('subjectName required', 400);
    }
    const getAll = await subjectModel.find({ subjectName }).populate('classId');

    res.status(200).json({
      message: 'get all by subject name subject',
      data: getAll
    });
  }

  @auth('admin', 'moderator', 'teacher')
  public async getAllByClassNameName(req: Request, res: Response) {
    const { className } = req.params;
    if (!className) {
      throw new ServerError('subjectName required', 400);
    }

    const result = await subjectModel.aggregate([
      {
        $lookup: {
          from: 'ClassName',
          localField: 'classId',
          foreignField: '_id',
          as: 'classInfo'
        }
      },
      {
        $unwind: {
          path: '$classInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          'classInfo.className': className.toLowerCase()
        }
      },
      {
        // Project the necessary fields
        $project: {
          _id: 1,
          subjectName: 1
          // 'classInfo.className': 1
        }
      }
    ]);

    res.status(200).json({
      message: 'all by class name subject',
      data: result
    });
  }
}
