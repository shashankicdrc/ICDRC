// ─── Global error handlers ────────────────────────────────────────────────────
// NOTE: static `import` statements are hoisted and run BEFORE this module body,
// so these handlers only catch errors that occur AFTER all imports are resolved.
// For import-phase errors in worker processes we use dynamic import() below.
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

// Cap workers at 2 — the container only has 0.5 CPUs allocated.
// cpus().length returns the host's physical core count (e.g. 8), which would
// spawn 8 memory-heavy workers and trigger an OOM SIGKILL.
const numWorkers = Math.min(cpus().length, 2);

if (cluster.isPrimary) {
    process.stdout.write(`PRIMARY process id: ${process.pid}\n`);

    for (let index = 0; index < numWorkers; index++) {
        const worker = cluster.fork();

        worker.on("exit", (code, signal) => {
            if (signal) {
                process.stderr.write(`worker killed by signal: ${signal}\n`, () => process.exit(1));
            } else if (code !== 0) {
                process.stderr.write(`worker exited with error code: ${code}\n`, () => process.exit(code));
            } else {
                process.stdout.write("worker exited successfully\n", () => process.exit(0));
            }
        });
    }
} else {
    // ─── Worker process ───────────────────────────────────────────────────────
    // Use dynamic import so any error during server.js module loading (or any
    // of its sub-imports) is caught as a rejected promise and logged clearly.
    process.stdout.write(`WORKER process id: ${process.pid} starting...\n`);

    import("./server.js")
        .then((mod) => mod.default())
        .catch((err) => {
            process.stderr.write(`WORKER STARTUP ERROR: ${err.stack || err.message}\n`, () => {
                process.exit(1);
            });
        });
}
