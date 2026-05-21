import { Queue, Worker } from 'bullmq'
import scheduleEmailProcessor from '#queues/processor/EmailSchedule';
import { connector } from '#config/redisConfig';

export const queues = {
    EmailQueue: new Queue("email-queue", {
        connection: connector,
    }),
};

queues.EmailQueue.on('error', (err) => {
    process.stderr.write(`BullMQ Queue error: ${err.message}\n`);
});

export const workers = {
    emailWorker: new Worker(queues.EmailQueue.name, scheduleEmailProcessor, {
        connection: connector,
    }),
};

workers.emailWorker.on('error', (err) => {
    process.stderr.write(`BullMQ Worker error: ${err.message}\n`);
});
