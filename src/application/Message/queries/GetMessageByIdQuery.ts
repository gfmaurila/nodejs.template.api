import { IMessageRepository } from "@/domain/interfaces/IMessageRepository";
import { MessageEntity } from "@/domain/entities/MessageEntity";

export class GetMessageByIdQuery {
  constructor(private readonly Repository: IMessageRepository) {}
  public async Handle(id: string): Promise<MessageEntity | null> {
    return this.Repository.GetByIdAsync(id);
  }
}
