import { describe, it, expect } from 'vitest';
import { MySqlDatabase } from '../MySqlDatabase';

describe('MySqlDatabase', () => {
  it('should connect to MySQL and return expected result', async () => {
    await expect(MySqlDatabase.testConnection()).resolves.not.toThrow();
  });
});
