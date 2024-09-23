// Message Queues:
// Use message queues for asynchronous processing:
const amqp = require('amqplib');

export const processQueue=async()=> {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);

    channel.consume(queue, async (msg) => {
        const task = JSON.parse(msg.content.toString());
        // Process the task
        await processTask(task);
        channel.ack(msg);
    }, { noAck: false });
}