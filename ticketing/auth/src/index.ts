import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      // this is the JWT created in k8s using the
      //"kubectl create secret generic jwt-secret --from-literal=JWT_KEY=[value]"
      throw new Error("JWT_KEY must be defined");
    }
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongodB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.error("listening on port 3000");
  });
};

start();
