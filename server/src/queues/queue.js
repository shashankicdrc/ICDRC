import { Queue, Worker } from 'bullmq'
import scheduleEmailProcessor from '#queues/processor/EmailSchedule';
import { connector } from '#config/redisConfig';

export const queues = {
    EmailQueue: new Queue("email-queue", {
        connection: connector,
    }),
};

export const workers = {
    emailWorker: new Worker(queues.EmailQueue.name, scheduleEmailProcessor, {
        connection: connector,
    }),
};


