// src/domain/entities/BaseEntity.ts

import { Event } from '../../core/domain/events/Event';

export abstract class BaseEntity {
  public Id: number | null = null;
  public Status: boolean = true;
  public DtInsert: Date | null = null;
  public DtUpdate: Date | null = null;

  private _DomainEvents: Event[] = [];

  public SetId(id: number): void {
    this.Id = id;
  }

  public AddDomainEvent(domainEvent: Event): void {
    this._DomainEvents.push(domainEvent);
  }

  public ClearDomainEvents(): void {
    this._DomainEvents = [];
  }

  public get DomainEvents(): Event[] {
    return this._DomainEvents;
  }
}
