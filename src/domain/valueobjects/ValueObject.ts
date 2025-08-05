// src/domain/valueobjects/ValueObject.ts

export abstract class ValueObject<T> {
  abstract equals(vo?: T): boolean;
}
