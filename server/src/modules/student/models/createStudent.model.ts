import mongoose from 'mongoose';
import { IStudentDocument } from '@student/interfaces/createStudent.interface';

const StudentSchema = new mongoose.Schema<IStudentDocument>(
  {
    studentName: { type: String, required: true },
    class: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    bloodGroup: { type: String, default: null },
    fatherName: { type: String, default: null },
    motherName: { type: String, default: null },
    fatherProfession: { type: String, default: null },
    motherProfession: { type: String, default: null },
    parentAddress: { type: String, default: null },
    religion: { type: String, default: null },
    parentPhoneNumber: { type: String, default: null },
    studentId: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const studentModel = mongoose.model('student', StudentSchema, 'students');
