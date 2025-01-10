import mongoose from 'mongoose';
import { IClassDocument } from '@admin/interfaces/class.interface';

const ClassSchema = new mongoose.Schema<IClassDocument>(
  {
      className: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    }
  },
  {
    timestamps: true
  }
);

export const classModel = mongoose.model('ClassName', ClassSchema, 'ClassName');
