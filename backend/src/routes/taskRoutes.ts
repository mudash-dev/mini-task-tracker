import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { validateTask } from "../middleware/validation.js";

const router = Router();

router.get("/", getTasks);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);


export default router;
