import { NextFunction, Request, Response } from "express";

// Stub simples – ajuste para JWT/Redis depois.
export function getCurrentUser(req: Request, _res: Response, next: NextFunction) {
  // Ex.: ler Authorization: Bearer ...
  (req as any).user = { Id: "1", Email: "user@example.com", Roles: ["USER"] };
  next();
}
