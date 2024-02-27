import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// import cors from "cors";
// router-------------------------------------------------------------------
import industryOfCompanyRoutes from "./routes/industryOfComopanyroutes.js";
import skillOfCompanyRoutes from "./routes/skillOfCompanyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoute.js";
import applyRoutes from "./routes/applyRoutes.js"
// connect mongoDB ---------------------------------------------------------
import connectDB from "./config/db.js";

connectDB();
const port = 5000;

const app = express();
// middleware ---------------------------------------------------------------
app.use("/files", express.static("files"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files", express.static("files")); 
// APIs-------------------------------------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/skillofcompany", skillOfCompanyRoutes);
app.use("/api/industryofcompany", industryOfCompanyRoutes);
app.use("/api/jobPost", postRoutes);
app.use("/api/apply", applyRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server stared on port ${port}`));
