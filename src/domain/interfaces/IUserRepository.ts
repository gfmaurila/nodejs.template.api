import { UserEntity } from '@/domain/entities/UserEntity';

export interface IUserRepository {
  Add(user: UserEntity): Promise<void>;
  GetAll(): Promise<UserEntity[]>;
  GetById(userId: number): Promise<UserEntity | null>;
  Update(userId: number, user: UserEntity): Promise<void>;
  Delete(userId: number): Promise<void>;
  Exists(userId: number): Promise<boolean>;
  GetByEmail(email: string): Promise<UserEntity | null>;
  GetAuthByEmailPassword(email: string, password: string): Promise<UserEntity | null>;
  GetPaged(
    name?: string,
    email?: string,
    page?: number,
    pageSize?: number
  ): Promise<{ data: UserEntity[]; total: number }>;
}
