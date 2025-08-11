import { ResetPasswordDto } from "@/application/Auth/dtos/ResetPasswordDto";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { ForgotPasswordCodeService } from "@/infrastructure/service/ForgotPasswordCodeService";
import { UserPasswordResetDomainEvent } from "@/domain/entities/User/events/UserPasswordResetDomainEvent";
import { Password } from "@/core/util/Password";

export class ResetPasswordCommandHandler {
  private repository = new UserRepository();
  private codeService = new ForgotPasswordCodeService();

  public async Handle(dto: ResetPasswordDto) {
    const userId = await this.codeService.GetUserIdByCode(dto.Code);
    if (!userId) throw new Error("Código inválido ou expirado.");

    const user = await this.repository.GetById(userId);
    if (!user) throw new Error("Usuário não encontrado.");

    user.Senha = Password.ComputeSha256Hash(dto.NewPassword);
    await this.repository.Update(userId, user);

    await this.codeService.DeleteCode(dto.Code);

    user.AddDomainEvent(new UserPasswordResetDomainEvent(userId));
    return { message: "Senha redefinida com sucesso." };
  }
}
