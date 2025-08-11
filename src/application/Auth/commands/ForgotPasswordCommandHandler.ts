import { ForgotPasswordDto } from "@/application/Auth/dtos/ForgotPasswordDto";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { ForgotPasswordCodeService } from "@/infrastructure/service/ForgotPasswordCodeService";
import { EmailService } from "@/infrastructure/service/EmailService";
import { UserForgotPasswordDomainEvent } from "@/domain/entities/User/events/UserForgotPasswordDomainEvent";

export class ForgotPasswordCommandHandler {
  private repository = new UserRepository();
  private codeService = new ForgotPasswordCodeService();
  private emailService = new EmailService();

  public async Handle(dto: ForgotPasswordDto) {
    const user = await this.repository.GetByEmail(dto.Email);
    if (!user) throw new Error("Usuário não encontrado.");

    const code = await this.codeService.GenerateCode(user.Id);
    this.emailService.SendResetPasswordEmail(dto.Email, code);

    user.AddDomainEvent(new UserForgotPasswordDomainEvent(dto.Email, code));
    return { message: "Link de redefinição enviado para o e-mail." };
  }
}
