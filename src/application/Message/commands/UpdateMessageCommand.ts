import { IMessageRepository } from "@/domain/interfaces/IMessageRepository";
import { MessageDto } from "@/application/Message/dtos/MessageDto";

export class UpdateMessageCommand {
  constructor(private readonly Repository: IMessageRepository) {}
  public async Handle(id: string, dto: MessageDto): Promise<void> {
    const ok = await this.Repository.UpdateAsync(id, dto);
    if (!ok) throw new Error("Message not found");
  }
}
