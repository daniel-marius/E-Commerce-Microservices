const NODEPORT = 3000;

import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("No JWT_KEY");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("No MONGO_URI!");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("No NATS_CLIENT_ID!");
  }

  if (!process.env.NATS_URL) {
    throw new Error("No NATS_URL!");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("No NATS_CLUSTER_ID!");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }

  app.listen(NODEPORT, () => {
    console.log(`Listening on port ${NODEPORT}!`);
  });
};

start();
