import { IUserRepository } from '@/domain/interfaces/IUserRepository';
import { UserEntity } from '@/domain/entities/UserEntity';
import { Email } from '@/domain/valueobjects/Email';
import { PhoneNumber } from '@/domain/valueobjects/PhoneNumber';
import { ENotificationType } from '@/domain/enums/ENotificationType';
import { EGender } from '@/domain/enums/EGender';
import { SqlServerDatabase } from '@/infrastructure/database/SqlServerDatabase';
import { Password } from '@/core/util/Password';
import { QueryTypes } from 'sequelize';

export class UserRepository implements IUserRepository {
  async Add(user: UserEntity): Promise<void> {
    const sequelize = SqlServerDatabase.getInstance();

    const result: any = await sequelize.query(
      `
        INSERT INTO TB_USER (Name, Email, Senha, Phone, Notification, Gender)
        OUTPUT INSERTED.Id
        VALUES (:Name, :Email, :Senha, :Phone, :Notification, :Gender)
      `,
      {
        replacements: {
          Name: user.Name,
          Email: user.Email.address,
          Senha: user.Senha,
          Phone: user.Phone?.phone ?? null,
          Notification: user.Notification,
          Gender: user.Gender,
        },
        type: QueryTypes.INSERT,
      }
    );

    user.Id = result[0][0].Id;
  }

  async GetAll(): Promise<UserEntity[]> {
    const sequelize = SqlServerDatabase.getInstance();

    const rows: any[] = await sequelize.query(
      `SELECT * FROM TB_USER`,
      { type: QueryTypes.SELECT }
    );

    return rows.map(this.mapToEntity);
  }

  async GetById(userId: number): Promise<UserEntity | null> {
    const sequelize = SqlServerDatabase.getInstance();

    const rows: any[] = await sequelize.query(
      `SELECT * FROM TB_USER WHERE Id = :Id`,
      {
        replacements: { Id: userId },
        type: QueryTypes.SELECT,
      }
    );

    if (rows.length === 0) return null;
    return this.mapToEntity(rows[0]);
  }

  async Update(userId: number, user: UserEntity): Promise<void> {
    const sequelize = SqlServerDatabase.getInstance();

    await sequelize.query(
      `
        UPDATE TB_USER
        SET Name = :Name,
            Email = :Email,
            Senha = :Senha,
            Phone = :Phone,
            Notification = :Notification,
            Gender = :Gender
        WHERE Id = :Id
      `,
      {
        replacements: {
          Id: userId,
          Name: user.Name,
          Email: user.Email.address,
          Senha: user.Senha,
          Phone: user.Phone?.phone ?? null,
          Notification: user.Notification,
          Gender: user.Gender,
        },
        type: QueryTypes.UPDATE,
      }
    );
  }

  async Delete(userId: number): Promise<void> {
    const sequelize = SqlServerDatabase.getInstance();

    await sequelize.query(
      `DELETE FROM TB_USER WHERE Id = :Id`,
      {
        replacements: { Id: userId },
        type: QueryTypes.DELETE,
      }
    );
  }

  async Exists(userId: number): Promise<boolean> {
    const sequelize = SqlServerDatabase.getInstance();

    const rows: any[] = await sequelize.query(
      `SELECT 1 AS found FROM TB_USER WHERE Id = :Id`,
      {
        replacements: { Id: userId },
        type: QueryTypes.SELECT,
      }
    );

    return rows.length > 0;
  }

  async GetByEmail(email: string): Promise<UserEntity | null> {
    const sequelize = SqlServerDatabase.getInstance();

    const rows: any[] = await sequelize.query(
      `SELECT * FROM TB_USER WHERE Email = :Email`,
      {
        replacements: { Email: email },
        type: QueryTypes.SELECT,
      }
    );

    if (rows.length === 0) return null;
    return this.mapToEntity(rows[0]);
  }

  async GetAuthByEmailPassword(email: string, password: string): Promise<UserEntity | null> {
    const sequelize = SqlServerDatabase.getInstance();
    const hashed = Password.ComputeSha256Hash(password);

    const rows: any[] = await sequelize.query(
      `SELECT * FROM TB_USER WHERE Email = :Email AND Senha = :Senha`,
      {
        replacements: { Email: email, Senha: hashed },
        type: QueryTypes.SELECT,
      }
    );

    if (rows.length === 0) return null;
    return this.mapToEntity(rows[0]);
  }

  async GetPaged(
    name = '',
    email = '',
    page = 1,
    pageSize = 10
  ): Promise<{ data: UserEntity[]; total: number }> {
    const sequelize = SqlServerDatabase.getInstance();
    const offset = (page - 1) * pageSize;

    const dataRows: any[] = await sequelize.query(
      `
        SELECT * FROM TB_USER
        WHERE Name LIKE :Name AND Email LIKE :Email
        ORDER BY Id
        OFFSET :Offset ROWS FETCH NEXT :PageSize ROWS ONLY
      `,
      {
        replacements: {
          Name: `%${name}%`,
          Email: `%${email}%`,
          Offset: offset,
          PageSize: pageSize,
        },
        type: QueryTypes.SELECT,
      }
    );

    const countResult: any[] = await sequelize.query(
      `
        SELECT COUNT(*) AS total FROM TB_USER
        WHERE Name LIKE :Name AND Email LIKE :Email
      `,
      {
        replacements: {
          Name: `%${name}%`,
          Email: `%${email}%`,
        },
        type: QueryTypes.SELECT,
      }
    );

    return {
      data: dataRows.map(this.mapToEntity),
      total: countResult[0].total,
    };
  }

  private mapToEntity(row: any): UserEntity {
    return new UserEntity({
      Id: row.Id,
      Name: row.Name,
      Email: new Email(row.Email),
      Senha: row.Senha,
      Phone: row.Phone ? new PhoneNumber(row.Phone) : null,
      Notification: row.Notification as ENotificationType,
      Gender: row.Gender as EGender,
      triggerDomainEvent: false,
      hashPassword: false,
    });
  }
}
import { Op } from "sequelize";
import { UserModel } from "@/infrastructure/database/models/UserModel";
import { UserDto } from "@/application/User/dtos/UserDto";
import { UserQueryModel } from "@/application/User/dtos/UserQueryModel";

export class UserRepository {
  async CreateAsync(dto: UserDto): Promise<UserModel> {
    return await UserModel.create({
      Name: dto.Name,
      Email: dto.Email,
      Senha: dto.Senha,
      Phone: dto.Phone
    });
  }

  async UpdateAsync(id: number, dto: UserDto): Promise<void> {
    await UserModel.update(
      { Name: dto.Name, Email: dto.Email, Senha: dto.Senha, Phone: dto.Phone },
      { where: { Id: id } }
    );
  }

  async DeleteAsync(id: number): Promise<void> {
    await UserModel.destroy({ where: { Id: id } });
  }

  async GetAllAsync(): Promise<UserQueryModel[]> {
    const rows = await UserModel.findAll({ order: [["Id", "ASC"]] });
    return rows.map(this.MapToQuery);
  }

  async GetByIdAsync(id: number): Promise<UserQueryModel | null> {
    const row = await UserModel.findOne({ where: { Id: id } });
    return row ? this.MapToQuery(row) : null;
  }

  async GetPagedAsync(name?: string, email?: string, page = 1, pageSize = 10) {
    const where: any = {};
    if (name) where.Name = { [Op.like]: `%${name}%` };
    if (email) where.Email = { [Op.like]: `%${email}%` };

    const offset = (page - 1) * pageSize;

    const { rows, count } = await UserModel.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [["Id", "ASC"]]
    });

    return { items: rows.map(this.MapToQuery), total: count };
  }

  private MapToQuery(row: UserModel): UserQueryModel {
    return {
      Id: row.Id,
      Name: row.Name,
      Email: row.Email,
      Phone: row.Phone ?? undefined,
      CreatedAt: row.createdAt
    };
  }
}
