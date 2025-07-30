@echo off
REM Criação da estrutura de pastas
mkdir src\api
mkdir src\application\Auth
mkdir src\application\Github
mkdir src\application\Log
mkdir src\application\Message
mkdir src\application\User
mkdir src\core\domain
mkdir src\core\env
mkdir src\core\response
mkdir src\core\security
mkdir src\core\util
mkdir src\domain\entities
mkdir src\domain\enums
mkdir src\domain\interfaces
mkdir src\domain\valueobjects
mkdir src\infrastructure\database
mkdir src\infrastructure\integration\github
mkdir src\infrastructure\logging
mkdir src\infrastructure\messaging\User\Pub
mkdir src\infrastructure\repositories
mkdir src\infrastructure\service
mkdir src\worker\User

REM Criação dos arquivos .ts
type nul > src\api\AuthController.ts
type nul > src\api\GithubController.ts
type nul > src\api\LogController.ts
type nul > src\api\MessageController.ts
type nul > src\api\MessagingTestController.ts
type nul > src\api\RedisPostController.ts
type nul > src\api\UserController.ts
type nul > src\worker\index.ts
type nul > src\main.ts

echo Estrutura criada com sucesso!
pause
