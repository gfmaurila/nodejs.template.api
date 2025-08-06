import { BaseEntity } from '@/domain/entities/BaseEntity';
import { IAggregateRoot } from '@/core/domain/interfaces/IAggregateRoot';
import { Password } from '@/core/util/Password';
import { Email } from '@/domain/valueobjects/Email';
import { PhoneNumber } from '@/domain/valueobjects/PhoneNumber';
import { ENotificationType } from '@/domain/enums/ENotificationType';
import { EGender } from '@/domain/enums/EGender';
import { UserCreatedDomainEvent } from '@/domain/events/UserCreatedDomainEvent';

export interface IUserEntityProps {
  Id: number;
  Name: string;
  Email: Email;
  Senha: string;
  Phone: PhoneNumber | null;
  Notification: ENotificationType;
  Gender: EGender;
  triggerDomainEvent?: boolean;
  hashPassword?: boolean;
}

export class UserEntity extends BaseEntity implements IAggregateRoot {
  public Id: number;
  public Name: string;
  public Email: Email;
  public Senha: string;
  public Phone: PhoneNumber | null;
  public Notification: ENotificationType;
  public Gender: EGender;

  constructor(props: IUserEntityProps) {
    super();

    this.Id = props.Id;
    this.Name = props.Name;
    this.Email = props.Email;
    this.Senha = props.hashPassword === false
      ? props.Senha
      : Password.ComputeSha256Hash(props.Senha);
    this.Phone = props.Phone ?? null;
    this.Notification = props.Notification;
    this.Gender = props.Gender;

    if (props.triggerDomainEvent !== false) {
      this.AddDomainEvent(
        new UserCreatedDomainEvent({
          Id: this.Id,
          Name: this.Name,
          Email: this.Email.address,
          Phone: this.Phone?.phone ?? null,
          Notification: this.Notification,
          Gender: this.Gender,
        })
      );
    }
  }
}
