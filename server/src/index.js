import cluster from "cluster";
import { cpus } from "os";
import startServer from "./server.js";
import logger from "#utils/logger";

const numCPUs = cpus().length;

const productionServer = () => {
    if (cluster.isPrimary) {
        logger.info(`The primary process id is ${process.pid}`);

        for (let index = 0; index < numCPUs; index++) {
            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
            if (signal) {
                logger.info(`Worker ${worker.process.pid} was killed by signal: ${signal}`);
            } else if (code !== 0) {
                logger.error(`Worker ${worker.process.pid} exited with error code: ${code}`);
                logger.info("Restarting worker in 2 seconds...");
                setTimeout(() => {
                    cluster.fork();
                }, 2000);
            } else {
                logger.info(`Worker ${worker.process.pid} exited successfully.`);
            }
        });
    } else {
        startServer();
    }
};

process.env.NODE_ENV === "production" ? productionServer() : startServer();
