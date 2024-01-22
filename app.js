require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");
//rOUtes
app.get("/", (reqr, res) =>
  res.send('<h1>Store Api</h1><a href="/api/v1/products">prodcuts</a>')
);
app.use("/api/v1/products", productsRouter);

// middlewares
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

const start = async () => {
  // connect db
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Sever listen on ${port}`));
};
start();
