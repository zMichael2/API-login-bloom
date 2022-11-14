import mongoose from "mongoose";

const dbConnetion = async () => {
  const Urlmongol = `${process.env.URLMONGOL}`;
  try {
    await mongoose.connect(Urlmongol);
    console.log("The database has been successfully connected.");
  } catch (error) {
    console.log(`Could not connect to database: ${error}`);
  }
};

export default dbConnetion;
