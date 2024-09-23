const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['172.16.15.98:9092'],
    connectionTimeout: 10000 // 10 seconds
});

const producer = kafka.producer();

async function sendMessage() {
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello Kafka!' },
        ],
    });
    await producer.disconnect();
}

sendMessage().catch(console.error);