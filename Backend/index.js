import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import user from "./routes/user.route.js";
import task from "./routes/task.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use("/user", user);
app.use("/task", task);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
