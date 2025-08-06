import { Event } from '@/core/domain/events/Event';

export class UserDeletedDomainEvent extends Event {
  public Id: number;
  public Name: string;
  public Email: string;

  constructor(userId: number, name: string, email: string) {
    super();
    this.Id = userId;
    this.Name = name;
    this.Email = email;
  }
}
