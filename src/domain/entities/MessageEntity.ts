export interface MessageEntity {
  Id: string;        // string do ObjectId
  Sender: string;
  Recipient: string;
  Content: string;
  CreatedAt: Date;
  UpdatedAt?: Date;
}
