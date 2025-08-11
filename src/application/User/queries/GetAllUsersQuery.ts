import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { UserQueryModel } from "@/application/User/dtos/UserQueryModel";

export class GetAllUsersQuery {
  constructor(private readonly Repository: UserRepository) {}
  public async Handle(): Promise<UserQueryModel[]> {
    return this.Repository.GetAllAsync();
  }
}
