import { ObjectId } from "mongodb";
import { MongoDatabase } from "@/infrastructure/database/MongoDatabase";
import { IMessageRepository } from "@/domain/interfaces/IMessageRepository";
import { MessageEntity } from "@/domain/entities/MessageEntity";

export class MessageRepository implements IMessageRepository {
  private CollectionName = "messages";

  public async CreateAsync(dto: Omit<MessageEntity, "Id" | "CreatedAt">): Promise<string> {
    const db = await MongoDatabase.GetDbAsync();
    const now = new Date();
    const doc = { Sender: dto.Sender, Recipient: dto.Recipient, Content: dto.Content, CreatedAt: now, UpdatedAt: now };
    const result = await db.collection(this.CollectionName).insertOne(doc);
    return result.insertedId.toHexString();
  }

  public async GetAllAsync(): Promise<MessageEntity[]> {
    const db = await MongoDatabase.GetDbAsync();
    const rows = await db.collection(this.CollectionName).find().toArray();
    return rows.map(this.Map);
  }

  public async GetByIdAsync(id: string): Promise<MessageEntity | null> {
    const db = await MongoDatabase.GetDbAsync();
    const row = await db.collection(this.CollectionName).findOne({ _id: new ObjectId(id) });
    return row ? this.Map(row) : null;
  }

  public async UpdateAsync(id: string, dto: Partial<Omit<MessageEntity, "Id" | "CreatedAt">>): Promise<boolean> {
    const db = await MongoDatabase.GetDbAsync();
    const res = await db.collection(this.CollectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...dto, UpdatedAt: new Date() } }
    );
    return res.matchedCount > 0;
  }

  public async DeleteAsync(id: string): Promise<boolean> {
    const db = await MongoDatabase.GetDbAsync();
    const res = await db.collection(this.CollectionName).deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount === 1;
  }

  private Map(x: any): MessageEntity {
    return {
      Id: x._id.toHexString(),
      Sender: x.Sender,
      Recipient: x.Recipient,
      Content: x.Content,
      CreatedAt: x.CreatedAt,
      UpdatedAt: x.UpdatedAt
    };
  }
}
