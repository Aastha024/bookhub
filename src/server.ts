import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import authRoute from "./modules/auth/auth.route";
import bookRoute from "./modules/book/book.route";
import roleRoute from "./admin/modules/role/role.route"
import categoryRoute from "./admin/modules/category/category.route";
import 'module-alias/register';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, MongoDB with TypeScript!");
});
app.use("/api/auth", authRoute); 
app.use("/book", bookRoute)
app.use("/admin", roleRoute)
app.use("/admin/category", categoryRoute)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
