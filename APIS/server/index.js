import express from "express";
import cors from "cors";
import data from "./routes/data.routes.js";
import img from "./routes/img.routes.js";
import log from "./routes/login.js";
import comment from "./routes/comentario.js";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", data);
app.use("/api", comment);
app.use("/api", img);
app.use("/api", log);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
