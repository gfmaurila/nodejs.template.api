import { IMessageRepository } from "@/domain/interfaces/IMessageRepository";
import { MessageEntity } from "@/domain/entities/MessageEntity";

export class GetAllMessagesQuery {
  constructor(private readonly Repository: IMessageRepository) {}
  public async Handle(): Promise<MessageEntity[]> {
    return this.Repository.GetAllAsync();
  }
}
