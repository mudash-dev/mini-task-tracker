import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "Task Tracker API running successfully",
  });
});

app.use("/api/tasks", taskRoutes);

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
