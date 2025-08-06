// src/domain/valueobjects/PhoneNumber.ts

import { ValueObject } from './ValueObject';

export class PhoneNumber extends ValueObject<{ phone: string }> {
  constructor(phone: string) {
    if (!phone || !phone.trim()) {
      throw new Error('Invalid phone number');
    }

    super({ phone: phone.trim().toLowerCase() });
  }

  get phone(): string {
    return this.props.phone;
  }

  toString(): string {
    return this.props.phone;
  }

  // equals() herdado automaticamente de ValueObject
}
