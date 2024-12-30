import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import { rateLimit } from 'express-rate-limit';
import http from 'http';
import os from 'os';

import { config } from './config';


export class SetupServer {
    private readonly app: Application;
    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app: Application): void {
        app.set('trust proxy', 1);
        app.use(
            cors({
                origin: ['http://localhost:3000'],
                credentials: true,
                optionsSuccessStatus: 200
            })
        );
        app.use(helmet());
        app.use(hpp());
        app.use(
            rateLimit({
                windowMs: 15 * 60 * 100,
                limit: 1000,
                standardHeaders: 'draft-7',
                legacyHeaders: false
            })
        );
    }

    private standardMiddleware(app: Application): void {
        app.use(compression());
        app.use(express.json({ limit: '100MB' }));
        app.use(express.urlencoded({ extended: true, limit: '500MB' }));
    }

    private routesMiddleware(app: Application): void {
        // mainRoute(app);
    }

    private globalErrorHandler(app: Application): void {
        app.get('/', (req, res) => {
            res.json({ message: 'All Ok!', os: os.hostname() });
        });
        app.use('*', (req, res) => {
            res.status(404).json({ message: 'Routes not found!' });
        });
        // app.use();
    }
    private startServer(app: Application): void {
        const httpServer = http.createServer(app);
        httpServer.listen(config.PORT, () => {
            console.log(`STARTING SERVER ON PORT ${config.PORT} PROCESS ID =${process.pid}`);
        });
    }
}