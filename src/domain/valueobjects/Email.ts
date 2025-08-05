// src/domain/valueobjects/Email.ts

import { ValueObject } from './ValueObject';

export class Email extends ValueObject<Email> {
  private readonly _address: string;

  constructor(address: string) {
    super();
    if (!address || !address.includes('@')) {
      throw new Error('Invalid email address');
    }
    this._address = address.trim().toLowerCase();
  }

  get address(): string {
    return this._address;
  }

  toString(): string {
    return this._address;
  }

  equals(other?: Email): boolean {
    return !!other && this._address === other._address;
  }
}
