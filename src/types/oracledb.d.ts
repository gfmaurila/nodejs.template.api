declare module 'oracledb' {
  export const thin: boolean;
  export function initOracleClient(config: { libDir: string }): void;
  export function getConnection(options: {
    user: string;
    password: string;
    connectString: string;
  }): Promise<Connection>;

  export interface Connection {
    execute<T = any>(sql: string, bindParams?: any, options?: any): Promise<{ rows: T[] }>;
    close(): Promise<void>;
  }
}
