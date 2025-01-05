import { IStudentDocument } from '@student/interfaces/createStudent.interface';
import { studentModel } from '@student/models/createStudent.model';

class StudentService {
  public async createStudent(data: IStudentDocument): Promise<IStudentDocument | null> {
    return studentModel.create(data);
  }

  public async getStudentById(id: string): Promise<IStudentDocument | null> {
    return studentModel.findOne({ studentId: id });
  }

  public async updateStudent(id: string, data: IStudentDocument): Promise<IStudentDocument | null> {
    return studentModel.findByIdAndUpdate(
      id,
      {
        $set: data
      },
      { new: true }
    );
  }

  public async getAllStudents(skip: number, limit: number): Promise<IStudentDocument[]> {
    return studentModel.find().skip(skip).limit(limit);
  }

  public async deleteStudent(id: string): Promise<void> {
    await studentModel.findByIdAndDelete(id);
  }

  public async getSingle(id: string) {
    return studentModel.findById(id);
  }
}

export const studentService = new StudentService();
