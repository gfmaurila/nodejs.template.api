export class UserForgotPasswordDomainEvent {
  public Email: string;
  public Code: string;

  constructor(email: string, code: string) {
    this.Email = email;
    this.Code = code;
  }
}
