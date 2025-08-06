// src/core/domain/events/Event.ts

import { v4 as uuidv4 } from 'uuid';

export class Event {
  public MessageType: string;
  public AggregateId: string;
  public OccurredOn: Date;

  constructor() {
    this.MessageType = this.constructor.name;
    this.AggregateId = uuidv4();
    this.OccurredOn = new Date(); // UTC por padrão no JavaScript
  }
}
