// src/domain/entities/UserEntity.ts

import { BaseEntity } from '@/domain/entities/BaseEntity';
import { IAggregateRoot } from '../../core/domain/interfaces/IAggregateRoot';
import { Password } from '@/core/util/Password';
import { Email } from '@/domain/valueobjects/Email';
import { PhoneNumber } from '@/domain/valueobjects/PhoneNumber';
import { ENotificationType } from '@/domain/enums/ENotificationType';
import { EGender } from '@/domain/enums/EGender';
import { UserCreatedDomainEvent } from '@/domain/events/UserCreatedDomainEvent';

export class UserEntity extends BaseEntity implements IAggregateRoot {
  public Name: string;
  public Email: Email;
  public Senha: string;
  public Phone: PhoneNumber;
  public Notification: ENotificationType;
  public Gender: EGender;

  constructor(
    id: number,
    name: string,
    email: Email,
    senha: string,
    phone: PhoneNumber,
    notification: ENotificationType,
    gender: EGender
  ) {
    super();
    this.Id = id;
    this.Name = name;
    this.Email = email;
    this.Senha = Password.ComputeSha256Hash(senha);
    this.Phone = phone;
    this.Notification = notification;
    this.Gender = gender;

    this.AddDomainEvent(
      new UserCreatedDomainEvent({
        Id: this.Id,
        Name: this.Name,
        Email: this.Email.address,
        Phone: this.Phone.phone,
        Notification: this.Notification,
        Gender: this.Gender,
      })
    );
  }
}
