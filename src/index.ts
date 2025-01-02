import express from "express";
import {SetupServer} from "@root/app";
import {config} from "@root/config";
import {dbConnect} from "@root/dbConnect";
import {IUserDocument} from "@admin/auth/auth.interface";

declare global {
    namespace Express {
        interface Request {
            user?: IUserDocument;
            sessionId?: string;
        }
    }
}

class MainServer {
    public initialize() {
        const app = express();
        const setupServer:SetupServer = new SetupServer(app)
        config.validateConfig()
        dbConnect()
        setupServer.start();
    }
}

const mainServer = new MainServer();
mainServer.initialize();