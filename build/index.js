import dotenv from "dotenv";
import express from "express";
import dbController from "./controllers/dbController/index.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import router from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(ErrorHandlingMiddleware);
const start = async () => {
    try {
        await dbController.createDB();
        app.listen(PORT, async () => {
            console.log(`SERVER STARTED ON ${PORT} PORT`);
        });
    }
    catch (err) {
        console.log(err);
    }
};
start();
//# sourceMappingURL=index.js.map