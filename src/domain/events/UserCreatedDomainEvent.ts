import { Event } from '@/core/domain/events/Event';
import { EGender } from '@/domain/enums/EGender';
import { ENotificationType } from '@/domain/enums/ENotificationType';

interface UserCreatedDomainEventProps {
  Id: number;
  Name: string;
  Email: string;
  Phone: string;
  Notification: ENotificationType;
  Gender: EGender;
}

export class UserCreatedDomainEvent extends Event {
  public Id: number;
  public Name: string;
  public Email: string;
  public Phone: string;
  public Notification: ENotificationType;
  public Gender: EGender;

  constructor(props: UserCreatedDomainEventProps) {
    super();
    this.Id = props.Id;
    this.Name = props.Name;
    this.Email = props.Email;
    this.Phone = props.Phone;
    this.Notification = props.Notification;
    this.Gender = props.Gender;
  }
}
