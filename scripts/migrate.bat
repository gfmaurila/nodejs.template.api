@echo off
SETLOCAL
SET ENVIRONMENT=development
echo Running migrations...
npx sequelize-cli db:migrate --env %ENVIRONMENT%
ENDLOCAL
pause
