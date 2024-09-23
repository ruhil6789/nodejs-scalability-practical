
const amqp = require("amqplib");


// Declare a delayed exchange:
const setupQueue = async () => {

    const connection = await amqp.connect('amqp://admin:admin123@localhost');
    const channel = await connection.createChannel();

    // const queues = ['queuing', 'metrics', 'logs', 'tracking'];
    // for (const queue of queues) {
    //     await channel.assertQueue(queue, { durable: true });
    // }

    await channel.assertExchange('my-delayed-exchange', 'x-delayed-message', {
        arguments: { 'x-delayed-type': 'direct' }
    })
    return { connection, channel };

}

// Publish a delayed message:
function publishDelayedMessage(channel, message, delay) {
    channel.publish('my-delayed-exchange', 'my-routing-key', Buffer.from(message), {
        headers: { 'x-delay': delay }
    });
}

// Usage
// publishDelayedMessage(channel, 'Hello, delayed world!', 5000); // 5 second delay

// 

// Set up a consumer to receive the delayed messages:
async function setupConsumer(channel) {
    const queue = await channel.assertQueue('my-delayed-queue');
    await channel.bindQueue(queue.queue, 'my-delayed-exchange', 'my-routing-key');

    channel.consume(queue.queue, (msg) => {
        if (msg !== null) {
            console.log('Received:', msg.content.toString());
            channel.ack(msg);
        }
    });
}

// A routing key is a message attribute that the exchange looks at when deciding how to route the message to queues 
async function main() {
    let connection;
    try {
        connection = await amqp.connect('amqp://admin:admin123@localhost');
        const channel = await connection.createChannel();

        await channel.consume(queueName, (msg) => {
            console.log("Routing Key:", msg.fields.routingKey);
            console.log("Message:", msg.content.toString());
        });
        await channel.assertExchange('my-exchange', 'x-delayed-message', {
            arguments: { 'x-delayed-type': 'direct' }
        });

        await channel.publish('my-exchange', "routingKey", Buffer.from(message), {
            headers: {
                'x-delay': 5000 // 5 seconds delay
            }
        });
        await setupQueue(channel);
        await setupConsumer(channel);
        // await publishDelayedMessage(channel, 'Hello, delayed world!', 5000); // 5 second delay

        // Your application logic here
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (connection) await connection.close();
    }
}

main();