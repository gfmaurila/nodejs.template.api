import { IMessageRepository } from "@/domain/interfaces/IMessageRepository";

export class DeleteMessageCommand {
  constructor(private readonly Repository: IMessageRepository) {}
  public async Handle(id: string): Promise<boolean> {
    return this.Repository.DeleteAsync(id);
  }
}
