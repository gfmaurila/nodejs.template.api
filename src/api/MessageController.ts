import { Router, Request, Response } from "express";
import { validate } from "class-validator";
import { MessageDto } from "@/application/Message/dtos/MessageDto";
import { MessageRepository } from "@/infrastructure/repositories/MessageRepository";
import { CreateMessageCommand } from "@/application/Message/commands/CreateMessageCommand";
import { UpdateMessageCommand } from "@/application/Message/commands/UpdateMessageCommand";
import { DeleteMessageCommand } from "@/application/Message/commands/DeleteMessageCommand";
import { GetAllMessagesQuery } from "@/application/Message/queries/GetAllMessagesQuery";
import { GetMessageByIdQuery } from "@/application/Message/queries/GetMessageByIdQuery";

export const MessageController = Router();
const repository = new MessageRepository();

// POST /messages
MessageController.post("/", async (req: Request, res: Response) => {
  const dto = Object.assign(new MessageDto(), req.body);
  const errors = await validate(dto);
  if (errors.length) return res.status(400).json({ message: "Validation failed", errors });

  const command = new CreateMessageCommand(repository);
  const id = await command.Handle(dto);
  console.log(`Ação: POST /messages - Mensagem criada | Id: ${id} | De: ${dto.Sender} | Para: ${dto.Recipient}`);
  res.status(201).json(id);
});

// GET /messages
MessageController.get("/", async (_req: Request, res: Response) => {
  const query = new GetAllMessagesQuery(repository);
  const result = await query.Handle();
  console.log(`Ação: GET /messages - ${result.length} mensagens retornadas`);
  res.json(result);
});

// GET /messages/:id
MessageController.get("/:id", async (req: Request, res: Response) => {
  const query = new GetMessageByIdQuery(repository);
  const result = await query.Handle(req.params.id);
  if (!result) {
    console.warn(`Ação: GET /messages/${req.params.id} - Mensagem não encontrada`);
    return res.status(404).json({ message: "Mensagem não encontrada" });
  }
  console.log(`Ação: GET /messages/${req.params.id} - Mensagem retornada com sucesso`);
  res.json(result);
});

// PUT /messages/:id
MessageController.put("/:id", async (req: Request, res: Response) => {
  const dto = Object.assign(new MessageDto(), req.body);
  const errors = await validate(dto);
  if (errors.length) return res.status(400).json({ message: "Validation failed", errors });

  const command = new UpdateMessageCommand(repository);
  try {
    await command.Handle(req.params.id, dto);
    console.log(`Ação: PUT /messages/${req.params.id} - Atualizada | De: ${dto.Sender} | Para: ${dto.Recipient}`);
    res.json({ message: "Mensagem atualizada com sucesso." });
  } catch {
    res.status(404).json({ message: "Mensagem não encontrada" });
  }
});

// DELETE /messages/:id
MessageController.delete("/:id", async (req: Request, res: Response) => {
  const command = new DeleteMessageCommand(repository);
  const ok = await command.Handle(req.params.id);
  if (!ok) {
    console.warn(`Ação: DELETE /messages/${req.params.id} - Mensagem não encontrada`);
    return res.status(404).json({ message: "Mensagem não encontrada" });
  }
  console.log(`Ação: DELETE /messages/${req.params.id} - Mensagem deletada com sucesso`);
  res.json({ message: "Mensagem excluída com sucesso." });
});
