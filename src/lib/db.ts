import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    // await mongoose.connect(
    //   "mongodb+srv://manthan9481147615:manthan@cluster0.mmzg77h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // );
    await mongoose.connect(
      "mongodb+srv://manthan9481147615:manthan@cluster0.mmzg77h.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
