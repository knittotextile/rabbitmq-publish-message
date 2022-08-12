import core from "@actions/core";
import amqp from "amqplib";

console.log("amqp created.");

const RABBITMQ_HOST = core.getInput("rabbitmq_host");
const RABBITMQ_VHOSTNAME = core.getInput("rabbitmq_vhostname");
const RABBITMQ_USERNAME = core.getInput("rabbitmq_username");
const RABBITMQ_PASSWORD = core.getInput("rabbitmq_password");
const RABBITMQ_URL = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}/${RABBITMQ_VHOSTNAME}`;

const APP_ID = core.getInput("app_id");
const HEADERS = core.getInput("headers");
const MESSAGE = core.getInput("message");
const QUEUE_NAME = core.getInput("queue_name");

async function main() {
  let connection: amqp.Connection | null = null;
  let channel: amqp.Channel | null = null;

  try {
    console.log("amqp connecting...");
    connection = await amqp.connect(RABBITMQ_URL);

    console.log("creating channel");
    channel = await connection.createChannel();

    console.log("asserting channel");
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log("sending message");
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(MESSAGE)), {
      appId: APP_ID,
      contentType: "application/json",
    });

    console.log(" [x] Sent %s", MESSAGE);
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  } finally {
    await channel?.close?.();
    await connection?.close?.();
  }
}

main();
