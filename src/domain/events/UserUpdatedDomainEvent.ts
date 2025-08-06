import { Event } from '@/core/domain/events/Event';
import { EGender } from '@/domain/enums/EGender';
import { ENotificationType } from '@/domain/enums/ENotificationType';

export class UserUpdatedDomainEvent extends Event {
  public Id: number;
  public Name: string;
  public Email: string;
  public Phone: string;
  public Notification: ENotificationType;
  public Gender: EGender;

  constructor(
    userId: number,
    name: string,
    email: string,
    phone: string,
    notification: ENotificationType,
    gender: EGender
  ) {
    super();
    this.Id = userId;
    this.Name = name;
    this.Email = email;
    this.Phone = phone;
    this.Notification = notification;
    this.Gender = gender;
  }
}
