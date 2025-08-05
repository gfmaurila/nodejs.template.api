@echo off
SETLOCAL
SET ENVIRONMENT=development
echo Undoing last migration...
npx sequelize-cli db:migrate:undo --env %ENVIRONMENT%
ENDLOCAL
pause
