import { describe, it, expect } from 'vitest';
import { OracleDatabase } from '../OracleDatabase';

describe('OracleDatabase', () => {
  it('should connect to Oracle and return expected result', async () => {
    await expect(OracleDatabase.testConnection()).resolves.not.toThrow();
  });
});
