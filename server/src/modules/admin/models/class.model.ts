import mongoose from 'mongoose';
import { IClassDocument } from '@admin/interfaces/class.interface';

const ClassSchema = new mongoose.Schema<IClassDocument>(
  {
    studentGrade: {
      type: String,
      required: true,
      unique: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

export const classModel = mongoose.model('Class', ClassSchema, 'Class');
