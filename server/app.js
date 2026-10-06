import express from "express";
import cors from "cors";
import alertsCtrls from "./controllers/alertsCtrls.js";
import { connectDB } from "./db/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";
import usersCtrls from "./controllers/usersCtrls.js";
import { authenticateUser, authorization } from "./middlewares/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use(logger);

app.post("/api/auth/login", usersCtrls.login);
app.post("/api/auth/register", usersCtrls.register);

app.get("/api/auth/me", authenticateUser, usersCtrls.getUserDetails);
app.get(
  "/api/auth/users/:id",
  authenticateUser,
  authorization(["admin"]),
  usersCtrls.getUserDetails,
);
app.get(
  "/api/auth/users",
  authenticateUser,
  authorization(["admin"]),
  usersCtrls.getAllUsers,
);

app.get("/api/alerts", authenticateUser, alertsCtrls.getAlerts);
app.get("/api/alerts/:id", authenticateUser, alertsCtrls.getAlert);
app.post("/api/alerts", authenticateUser, alertsCtrls.createAlert);
app.put("/api/alerts/:id", authenticateUser, alertsCtrls.updateAlert);
app.delete("/api/alerts/:id", authenticateUser, alertsCtrls.deleteAlert);

app.use(errorHandler);

try {
  await connectDB();
  app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.log(`Failed to start server, error: ${error}`);
  process.exit(1);
}
