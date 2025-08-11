import { AuthCommand } from "@/application/Auth/dtos/AuthCommand";
import { AuthTokenResponse } from "@/application/Auth/dtos/AuthTokenResponse";
import { AuthCommandValidator } from "@/application/Auth/validators/AuthCommandValidator";
import { AuthService } from "@/infrastructure/service/AuthService";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { RefreshTokenRepository } from "@/infrastructure/repositories/RefreshTokenRepository";
import { UserLoggedInDomainEvent } from "@/domain/entities/User/events/UserLoggedInDomainEvent";

export class AuthCommandHandler {
  private validator = new AuthCommandValidator();
  private authService = new AuthService();
  private userRepository = new UserRepository();
  private refreshRepository = new RefreshTokenRepository();

  public async Handle(command: AuthCommand): Promise<AuthTokenResponse> {
    this.validator.Validate(command);

    const user = await this.userRepository.GetAuthByEmailPassword(command.Email, command.Password);
    if (!user) throw new Error("Usuário ou senha inválidos.");

    const { accessToken, expiresIn } = this.authService.GenerateAccessToken(user.Id, user.Email, ["USER"]);
    const refreshToken = this.authService.GenerateRefreshToken();

    await this.refreshRepository.Save(user.Id, refreshToken);

    user.AddDomainEvent(new UserLoggedInDomainEvent(user.Id, user.Email, accessToken));

    return { AccessToken: accessToken, RefreshToken: refreshToken, ExpiresIn: expiresIn };
  }
}
