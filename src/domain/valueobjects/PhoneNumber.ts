// src/domain/valueobjects/PhoneNumber.ts

import { ValueObject } from './ValueObject';

export class PhoneNumber extends ValueObject<PhoneNumber> {
  private readonly _phone: string;

  constructor(phone: string) {
    super();
    if (!phone || !phone.trim()) {
      throw new Error('Invalid phone number');
    }
    this._phone = phone.trim().toLowerCase();
  }

  get phone(): string {
    return this._phone;
  }

  toString(): string {
    return this._phone;
  }

  equals(other?: PhoneNumber): boolean {
    return !!other && this._phone === other._phone;
  }
}
