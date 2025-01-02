import { Application } from 'express';
import { studentRoute } from '@student/routes/createStudent.route';
import { adminRoute } from '@admin/routes/auth.route';
import { teacherRoute } from '@teacher/routes/teacher.route';

export default (app: Application) => {
  const routes = () => {
    app.use('/api/v1/admin', adminRoute.routes());
    app.use('/api/v1/student', studentRoute.routes());
    app.use('/api/v1/teacher', teacherRoute.routes());
  };

  routes();
};
