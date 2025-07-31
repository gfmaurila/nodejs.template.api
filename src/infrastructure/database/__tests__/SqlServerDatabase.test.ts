import { describe, it, expect, vi, beforeAll } from 'vitest';
import { SqlServerDatabase } from '../SqlServerDatabase';

describe('SqlServerDatabase', () => {
  beforeAll(async () => {
    // Garante que a instância seja criada antes dos testes
    await SqlServerDatabase.testConnection();
  });

  it('should connect successfully to SQL Server', async () => {
    await expect(SqlServerDatabase.testConnection()).resolves.not.toThrow();
  });

  it('should create all tables successfully', async () => {
    await expect(SqlServerDatabase.createAllTables()).resolves.not.toThrow();
  });

  it('should return a Sequelize instance', () => {
    const instance = SqlServerDatabase.getInstance();
    expect(instance).toBeDefined();
    expect(instance.getDialect()).toBe('mssql');
  });
});
