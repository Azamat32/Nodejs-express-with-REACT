import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import models from "./models/models.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routes/index.js";
import { ErrorHandler } from "./middleware/ErrorHandlingMiddleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use("/api", router);
app.use(ErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server is started succesfully on port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};
start();
