-- [api.nodejs.db].dbo.TB_USER definição

-- Drop table

-- DROP TABLE [api.nodejs.db].dbo.TB_USER;

CREATE TABLE [api.nodejs.db].dbo.TB_USER (
	Id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Email nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Senha nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Phone nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Notification int NOT NULL,
	Gender int NOT NULL,
	CONSTRAINT PK__TB_USER__3214EC0768F536FF PRIMARY KEY (Id)
);

SELECT Id, Name, Email, Senha, Phone, Notification, Gender FROM [api.nodejs.db].dbo.TB_USER;


INSERT INTO [api.nodejs.db].dbo.TB_USER (Name, Email, Senha, Phone, Notification, Gender)
VALUES
  ('João Silva', 'joao@example.com', HASHBYTES('SHA2_256', 'Joao123!'), '11999990001', 1, 1),
  ('Maria Oliveira', 'maria@example.com', HASHBYTES('SHA2_256', 'Maria@321'), '11999990002', 2, 2),
  ('Carlos Souza', 'carlos@example.com', HASHBYTES('SHA2_256', 'Carlos@senha'), '11999990003', 3, 1),
  ('Ana Costa', 'ana@example.com', HASHBYTES('SHA2_256', 'Ana321@'), '11999990004', 1, 2),
  ('Pedro Rocha', 'pedro@example.com', HASHBYTES('SHA2_256', 'Pedro@pass'), '11999990005', 2, 1),
  ('Guilherme F Maurila', 'gfmaurila@gmail.com', HASHBYTES('SHA2_256', '@G18u03i1986'), '11999999999', 1, 1);


