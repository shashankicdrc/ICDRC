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
                        process.stderr.write(`worker was killed by signal: ${signal}\n`, () => {
                            process.exit(1);
                        });
                    } else if (code !== 0) {
                        process.stderr.write(`worker exited with error code: ${code}\n`, () => {
                            process.exit(code);
                        });
                    } else {
                        process.stdout.write("worker success!\n", () => {
                            process.exit(0);
                        });
                    }
                });
            }
        })()
        : startServer();
};

process.env.NODE_ENV === "production" ? productionServer() : startServer();

