export class UserPasswordResetDomainEvent {
  public UserId: number;

  constructor(userId: number) {
    this.UserId = userId;
  }
}
