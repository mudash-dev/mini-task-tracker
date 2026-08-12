import type { Request, Response, NextFunction } from "express";

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, status } = req.body ?? {};

  // Title is required
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  // Title length
  if (title.trim().length > 100) {
    return res.status(400).json({
      message: "Title must be 100 characters or less",
    });
  }

  // Description must be a string if provided
  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message: "Description must be a string",
    });
  }

  // Status validation
  const validStatuses = ["TO_DO", "IN_PROGRESS", "COMPLETE"];

  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be TO_DO, IN_PROGRESS, or COMPLETE",
    });
  }

  next();
};
