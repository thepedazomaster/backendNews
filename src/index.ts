import express from "express";
import newsRoutes from "./routes/news.route";
import userRoutes from "./routes/user.route";
import userNewsRoutes from "./routes/newsUser.route";
import mastersRoutes from "./routes/masters.route";
import searchNewsRoutes from "./routes/search.route";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", async (_req, res) => {
  res.send("funciona");
});

app.use("/api/news", newsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/userNews", userNewsRoutes);
app.use("/api/masters", mastersRoutes);
app.use("/api/search", searchNewsRoutes);

app.listen(port, () => {
  console.log(`el server esta corriendo en el puerto ${port}`);
});
