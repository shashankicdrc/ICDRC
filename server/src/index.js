import cluster from "cluster";
import { cpus } from "os";
import startServer from "./server.js";
import logger from "#utils/logger";

const numCPUs = cpus().length;

const productionServer = () => {
    return cluster.isPrimary
        ? (() => {
            logger.info(`The primary process id is ${process.pid}`);
            for (let index = 0; index < numCPUs; index++) {
                const worker = cluster.fork();

                worker.on("exit", (code, signal) => {
                    if (signal) {
                        logger.info(`worker was killed by signal: ${signal}`);
                    } else if (code !== 0) {
                        logger.info(`worker exited with error code: ${code}`);
                    } else {
                        logger.info("worker success!");
                    }
                });
            }
        })()
        : startServer();
};

process.env.NODE_ENV === "production" ? productionServer() : startServer();

