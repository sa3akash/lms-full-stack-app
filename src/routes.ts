import {Application} from "express";
import {studentRoute} from "@student/auth/auth.route";
import {adminRoute} from "@admin/auth/auth.route";
import {teacherRoute} from "@teacher/auth/auth.route";

export default (app: Application) => {
    const routes = () => {
        app.use('/api/v1/admin', adminRoute.routes());
        app.use('/api/v1/student', studentRoute.routes());
        app.use('/api/v1/teacher', teacherRoute.routes());
    };

    routes();
};