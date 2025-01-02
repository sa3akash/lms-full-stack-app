import express from "express";
import {AuthController} from "./auth.controller";


class TeacherRoute {
    private readonly router: express.Router;
    constructor() {
        this.router = express.Router();
    }

    public routes(): express.Router {
        this.router.post('/register',AuthController.prototype.register)

        return this.router;
    }
}

export const teacherRoute:TeacherRoute = new TeacherRoute();