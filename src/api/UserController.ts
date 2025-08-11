import { Router, Request, Response } from "express";
import { UserDto } from "@/application/User/dtos/UserDto";
import { UserFilterDto } from "@/application/User/dtos/UserFilterDto";
import { GetPagedUsersQuery } from "@/application/User/queries/GetPagedUsersQuery";
import { GetAllUsersQuery } from "@/application/User/queries/GetAllUsersQuery";
import { GetUserByIdQuery } from "@/application/User/queries/GetUserByIdQuery";
import { CreateUserCommand } from "@/application/User/commands/Create/CreateUserCommand";
import { UpdateUserCommand } from "@/application/User/commands/Update/UpdateUserCommand";
import { DeleteUserCommand } from "@/application/User/commands/Delete/Events/DeleteUserCommand";
import { ApiResult, ErrorDetail } from "@/core/response/Responses";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { getCurrentUser } from "@/core/security/Security";

export const UserController = Router();
const repository = new UserRepository();

// Auth middleware (equivalente ao Depends)
UserController.use(getCurrentUser);

// POST /users
UserController.post("/", async (req: Request, res: Response) => {
  try {
    const dto = Object.assign(new UserDto(), req.body);
    const command = new CreateUserCommand(repository);
    const userCreated = await command.Handle(dto);
    console.info(`Ação: POST /users - Usuário criado | ID: ${userCreated.Id} | Nome: ${dto.Name}`);
    res.json(ApiResult.create_success({ id: userCreated.Id }, "Usuário criado com sucesso!"));
  } catch (ex: any) {
    console.error("Erro ao criar usuário:", ex);
    res.status(500).json(ApiResult.create_error([new ErrorDetail(ex.message)], 500));
  }
});

// GET /users
UserController.get("/", async (_req: Request, res: Response) => {
  try {
    const query = new GetAllUsersQuery(repository);
    const users = await query.Handle();
    console.info(`Ação: GET /users - ${users.length} usuários`);
    res.json(ApiResult.create_success(users, "Usuários carregados com sucesso."));
  } catch (ex: any) {
    console.error("Erro ao carregar usuários:", ex);
    res.status(500).json(ApiResult.create_error([new ErrorDetail(ex.message)], 500));
  }
});

// GET /users/paged
UserController.get("/paged", async (req: Request, res: Response) => {
  try {
    const filterDto = new UserFilterDto();
    filterDto.Name = req.query.name as string;
    filterDto.Email = req.query.email as string;
    filterDto.Page = parseInt(req.query.page as string) || 1;
    filterDto.PageSize = parseInt(req.query.pageSize as string) || 10;

    const query = new GetPagedUsersQuery(repository);
    const result = await query.Handle(filterDto);
    console.info(`Ação: GET /users/paged - Página ${filterDto.Page}`);
    res.json(result);
  } catch (ex: any) {
    console.error("Erro ao paginar usuários:", ex);
    res.status(500).json(ApiResult.create_error([new ErrorDetail(ex.message)], 500));
  }
});

// GET /users/:userId
UserController.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const query = new GetUserByIdQuery(repository);
    const userFound = await query.Handle(userId);

    if (!userFound) {
      console.warn(`Ação: GET /users/${userId} - Não encontrado`);
      return res.status(404).json(ApiResult.create_error([new ErrorDetail("Usuário não encontrado.")], 404));
    }

    console.info(`Ação: GET /users/${userId} - OK`);
    res.json(ApiResult.create_success(userFound));
  } catch (ex: any) {
    console.error(`Erro ao obter usuário ${req.params.userId}:`, ex);
    res.status(500).json(ApiResult.create_error([new ErrorDetail(ex.message)], 500));
  }
});

// PUT /users/:userId
UserController.put("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const dto = Object.assign(new UserDto(), req.body);
    const command = new UpdateUserCommand(repository);
    await command.Handle(userId, dto);
    console.info(`Ação: PUT /users/${userId} - Atualizado`);
    res.json(ApiResult.create_success(null, "Usuário atualizado com sucesso."));
  } catch (ex: any) {
    console.error(`Erro ao atualizar usuário ${req.params.userId}:`, ex);
    res.status(500).json(ApiResult.create_error([new ErrorDetail(ex.message)], 500));
  }
});

// DELETE /users/:userId
UserController.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const command = new DeleteUserCommand(repository);
    await command.Handle(userId);
    console.info(`Ação: DELETE /users/${userId} - Excluído`);
    res.json(ApiResult.create_success(null, "Usuário excluído com sucesso."));
  } catch (ex: any) {
    console.error(`Erro ao excluir usuário ${req.params.userId}:`, ex);
    res.status(500).json(ApiResult.create_error([new ErrorDetail(ex.message)], 500));
  }
});
