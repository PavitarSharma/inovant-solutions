import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRoute from "./routes/product.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import ErrorHandler from "./utils/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const PORT = process.env.PORT || 5001;
const app = express();

// enable cors
app.use(cors());
app.options("*", cors());

// set security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// database connection setup
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  const db = mongoose.connection;
  db.on("open", () => {
    console.log("Mongodb database is conneted");
  });

  db.on("error", (error) => {
    console.log(error);
  });

  //Logger
  app.use(morgan("tiny"));
}

// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

//HTTP request logger middleware
app.use(morgan("dev"));

// static file path
app.use(express.static(path.join(__dirname, "public")));

// file upload
app.use(fileUpload({ createParentPath: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server listining successful",
  });
});

app.use("/v1/products", productRoute);

app.use((req, res, next) => {
  next(new ErrorHandler("Not found", 404));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Serever has started on port ${PORT}`));
