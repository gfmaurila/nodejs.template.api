import { Router, Request, Response } from "express";
import { GithubService } from "@/infrastructure/integration/github/GithubService";
import { StoreUserProfileCommand } from "@/application/Github/commands/StoreUserProfileCommand";
import { StoreUserReposCommand } from "@/application/Github/commands/StoreUserReposCommand";
import { GetUserProfileQuery } from "@/application/Github/queries/GetUserProfileQuery";
import { GetUserReposQuery } from "@/application/Github/queries/GetUserReposQuery";
import { GetStoredUserProfileQuery } from "@/application/Github/queries/GetStoredUserProfileQuery";
import { GetStoredUserReposQuery } from "@/application/Github/queries/GetStoredUserReposQuery";

export const GithubController = Router();
const service = new GithubService();

// GET /github/user
GithubController.get("/user", async (_req: Request, res: Response) => {
  console.info("Buscando dados do usuário GitHub via API pública.");
  const query = new GetUserProfileQuery(service);
  const result = await query.Handle();
  res.json(result);
});

// GET /github/repos
GithubController.get("/repos", async (_req: Request, res: Response) => {
  console.info("Buscando repositórios do usuário GitHub via API pública.");
  const query = new GetUserReposQuery(service);
  const result = await query.Handle();
  res.json(result);
});

// POST /github/store/profile
GithubController.post("/store/profile", async (_req: Request, res: Response) => {
  console.info("Armazenando perfil GitHub no MongoDB.");
  const command = new StoreUserProfileCommand();
  await command.Handle();
  res.json({ message: "Perfil armazenado no MongoDB" });
});

// POST /github/store/repos
GithubController.post("/store/repos", async (_req: Request, res: Response) => {
  console.info("Armazenando repositórios GitHub no MongoDB.");
  const command = new StoreUserReposCommand();
  await command.Handle();
  res.json({ message: "Repositórios armazenados no MongoDB" });
});

// GET /github/stored/profile
GithubController.get("/stored/profile", async (_req: Request, res: Response) => {
  console.info("Buscando perfil armazenado no MongoDB.");
  const query = new GetStoredUserProfileQuery();
  const result = await query.Handle();
  res.json(result);
});

// GET /github/stored/repos
GithubController.get("/stored/repos", async (_req: Request, res: Response) => {
  console.info("Buscando repositórios armazenados no MongoDB.");
  const query = new GetStoredUserReposQuery();
  const result = await query.Handle();
  res.json(result);
});
