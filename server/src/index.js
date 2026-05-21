// ─── Global error handlers — must be registered before any other code ───────
// These catch crashes that happen during module loading (e.g. BullMQ/ioredis
// emitting an unhandled 'error' event on startup) which would otherwise kill
// the process silently.
process.on("uncaughtException", (err) => {
    process.stderr.write(`UNCAUGHT EXCEPTION: ${err.stack || err.message}\n`, () => {
        process.exit(1);
    });
});

process.on("unhandledRejection", (reason) => {
    const msg = reason instanceof Error ? reason.stack : String(reason);
    process.stderr.write(`UNHANDLED REJECTION: ${msg}\n`, () => {
        process.exit(1);
    });
});

import cluster from "cluster";
import { cpus } from "os";
import startServer from "./server.js";

const numCPUs = cpus().length;

const productionServer = () => {
    return cluster.isPrimary
        ? (() => {
            process.stdout.write(`PRIMARY process id: ${process.pid}\n`);
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
                        process.stdout.write("worker exited successfully\n", () => {
                            process.exit(0);
                        });
                    }
                });
            }
        })()
        : startServer();
};

process.env.NODE_ENV === "production" ? productionServer() : startServer();
