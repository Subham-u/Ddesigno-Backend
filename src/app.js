import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors(),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import adminRouter from "./routes/admin.routes.js";
import productRouter from "./routes/product.routes.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);

export default app;
