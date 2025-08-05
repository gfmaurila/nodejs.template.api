@echo off
SETLOCAL
SET NODE_ENV=development
npx ts-node --loader ts-node/esm src\infrastructure\database\seeds\SeedUsers.ts
ENDLOCAL
pause