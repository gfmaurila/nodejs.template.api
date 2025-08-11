import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { UserQueryModel } from "@/application/User/dtos/UserQueryModel";

export class GetUserByIdQuery {
  constructor(private readonly Repository: UserRepository) {}
  public async Handle(id: number): Promise<UserQueryModel | null> {
    return this.Repository.GetByIdAsync(id);
  }
}
