require("dotenv").config();

const jsonProducts = require("./products.json");
const productSchema = require("./models/product");
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await productSchema.deleteMany();
    await productSchema.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
start();
