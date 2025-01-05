import mongoose from 'mongoose';
import { ISubjectDocument } from '@admin/interfaces/auth.interface';

const SubjectSchema = new mongoose.Schema<ISubjectDocument>(
  {
    subjectName: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    grade: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const subjectModel = mongoose.model('Subject', SubjectSchema, 'Subject');
