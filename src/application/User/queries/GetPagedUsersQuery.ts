import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { PagedResponse } from "@/core/domain/model/PagedResponse";
import { UserFilterDto } from "@/application/User/dtos/UserFilterDto";
import { UserQueryModel } from "@/application/User/dtos/UserQueryModel";

export class GetPagedUsersQuery {
  constructor(private readonly Repository: UserRepository) {}
  public async Handle(filter: UserFilterDto): Promise<PagedResponse<UserQueryModel>> {
    const { items, total } = await this.Repository.GetPagedAsync(
      filter.Name,
      filter.Email,
      filter.Page,
      filter.PageSize
    );
    return PagedResponse.Create(items, total, filter.Page, filter.PageSize);
  }
}
