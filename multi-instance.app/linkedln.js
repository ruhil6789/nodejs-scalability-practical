// LinkedIn goes one step further, and defines four categories of messages: queuing, metrics, logs and tracking data


const amqp= require("amqplib")

  const a=()=>{
     const A= 2+2;
    cons
     return A
  }

  a()
const setupQueue=async()=>{
  
    const connection = await amqp.connect('amqp://admin:admin123@localhost');
    const channel = await connection.createChannel()

    const queues = ['queuing', 'metrics', 'logs', 'tracking'];
    for (const queue of queues) {
        await channel.assertQueue(queue, { durable: true });
    }

    return { connection, channel };

}

const publishMessage=async(channel, queue, message)=>{
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

const consumeMessages=async(channel, queue, callback)=> {
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const content = JSON.parse(msg.content.toString());
            callback(content);
            channel.ack(msg);
        }
    });
}


const main=async()=>{
    
    const {channel}= await setupQueue();

    await publishMessage(channel, 'queuing', { task: 'process_data', data: {"publish message":"hello"} });
    await publishMessage(channel, 'metrics', { cpu: 80, memory: 70 });
    await publishMessage(channel, 'logs', { level: 'error', message: 'Database connection failed' });
    await publishMessage(channel, 'tracking', { userId: 123, event: 'button_click' });


    // Consuming examples
    await consumeMessages(channel, 'queuing', (msg) => console.log('Processing task:', msg));
    await consumeMessages(channel, 'metrics', (msg) => console.log('Received metric:', msg));
    await consumeMessages(channel, 'logs', (msg) => console.log('Log entry:', msg));
    await consumeMessages(channel, 'tracking', (msg) => console.log('Tracking event:', msg));

}


main().catch(console.error);