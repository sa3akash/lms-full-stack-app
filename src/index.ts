import express from "express";
import {SetupServer} from "./app";
import {config} from "./config";
import {dbConnect} from "./dbConnect";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            };
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