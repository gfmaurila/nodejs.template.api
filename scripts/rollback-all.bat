@echo off
SETLOCAL
SET ENVIRONMENT=development
echo Undoing all migrations...
npx sequelize-cli db:migrate:undo:all --env %ENVIRONMENT%
ENDLOCAL
pause
