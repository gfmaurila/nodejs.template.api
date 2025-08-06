export class UserLoggedInDomainEvent {
  public UserId: string;
  public Email: string;
  public Token: string;
  public OccurredOn: Date;

  constructor(userId: string, email: string, token: string) {
    this.UserId = userId;
    this.Email = email;
    this.Token = token;
    this.OccurredOn = new Date(); // UTC
  }
}
