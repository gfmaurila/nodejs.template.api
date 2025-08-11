import { Router, Request, Response } from "express";
import { GetAllLogsQuery } from "@/application/Log/queries/GetAllLogsQuery";
import { DeleteLogsCommand } from "@/application/Log/commands/DeleteLogsCommand";

export const LogController = Router();

// GET /logs
LogController.get("/", async (req: Request, res: Response) => {
  const limit = Math.min(Number(req.query.limit) || 100, 1000);
  const query = new GetAllLogsQuery();
  const logs = await query.Execute(limit);

  console.info(`Ação: GET /logs - Retornando ${logs.length} logs (limite: ${limit})`);
  logs.forEach((log: any) => {
    if (log._id) log._id = String(log._id);
  });

  res.json(logs);
});

// DELETE /logs
LogController.delete("/", async (req: Request, res: Response) => {
  const olderThan = req.query.older_than as string | undefined;
  const command = new DeleteLogsCommand();

  if (olderThan) {
    const date = new Date(olderThan);
    if (isNaN(date.getTime())) {
      console.warn(`Ação: DELETE /logs - Parâmetro 'older_than' inválido: ${olderThan}`);
      return res.status(400).json({
        message: "Parâmetro 'older_than' inválido. Use o formato ISO 8601: YYYY-MM-DDTHH:MM:SS",
      });
    }

    const deleted = await command.DeleteOlderThan(olderThan);
    console.info(`Ação: DELETE /logs - Apagados ${deleted} logs anteriores a ${olderThan}`);
    return res.json({ deleted });
  }

  const deleted = await command.DeleteAll();
  console.info(`Ação: DELETE /logs - Apagados ${deleted} logs (todos)`);
  res.json({ deleted });
});
