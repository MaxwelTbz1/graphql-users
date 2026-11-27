import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/socialgraph");

    console.log("MongoDB connecté avec succès !");
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error);
    process.exit(1);
  }
};

export default connectDB;
