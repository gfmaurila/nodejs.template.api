import { IMessageRepository } from "@/domain/interfaces/IMessageRepository";
import { MessageDto } from "@/application/Message/dtos/MessageDto";

export class CreateMessageCommand {
  constructor(private readonly Repository: IMessageRepository) {}
  public async Handle(dto: MessageDto): Promise<string> {
    return this.Repository.CreateAsync({ ...dto, UpdatedAt: new Date() } as any);
  }
}
