import { Router, Request, Response } from "express";
import { AuthCommand } from "@/application/Auth/dtos/AuthCommand";
import { ForgotPasswordDto } from "@/application/Auth/dtos/ForgotPasswordDto";
import { ResetPasswordDto } from "@/application/Auth/dtos/ResetPasswordDto";
import { AuthCommandHandler } from "@/application/Auth/commands/AuthCommandHandler";
import { ForgotPasswordCommandHandler } from "@/application/Auth/commands/ForgotPasswordCommandHandler";
import { ResetPasswordCommandHandler } from "@/application/Auth/commands/ResetPasswordCommandHandler";

export const AuthController = Router();

AuthController.post("/login", async (req: Request, res: Response) => {
  try {
    const command = Object.assign(new AuthCommand(), req.body);
    const result = await new AuthCommandHandler().Handle(command);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

AuthController.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const dto = Object.assign(new ForgotPasswordDto(), req.body);
    const result = await new ForgotPasswordCommandHandler().Handle(dto);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

AuthController.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const dto = Object.assign(new ResetPasswordDto(), req.body);
    const result = await new ResetPasswordCommandHandler().Handle(dto);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});
