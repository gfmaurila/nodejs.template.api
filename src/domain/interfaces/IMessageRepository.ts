import { MessageEntity } from "@/domain/entities/MessageEntity";

export interface IMessageRepository {
  CreateAsync(dto: Omit<MessageEntity, "Id" | "CreatedAt">): Promise<string>;
  GetAllAsync(): Promise<MessageEntity[]>;
  GetByIdAsync(id: string): Promise<MessageEntity | null>;
  UpdateAsync(id: string, dto: Partial<Omit<MessageEntity, "Id" | "CreatedAt">>): Promise<boolean>;
  DeleteAsync(id: string): Promise<boolean>;
}
