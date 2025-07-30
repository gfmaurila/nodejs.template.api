import { describe, expect, test } from 'vitest';
import { Settings } from '@/core/env/Settings';

function expectDefined(value: any, key: string) {
  expect(value, `${key} is undefined or empty`).toBeDefined();
  if (typeof value === 'string') {
    expect(value.length).toBeGreaterThan(0);
  }
}

describe('Connection Settings Validation', () => {
  test('App basic settings', () => {
    expectDefined(Settings.AppName, 'APP_NAME');
    expectDefined(Settings.Environment, 'ENVIRONMENT');
    expect(typeof Settings.Debug).toBe('boolean');
  });

  test('JWT Settings', () => {
    expectDefined(Settings.SecretKey, 'SECRET_KEY');
    expectDefined(Settings.Issuer, 'ISSUER');
    expectDefined(Settings.Audience, 'AUDIENCE');
  });

  test('Redis Settings', () => {
    expectDefined(Settings.RedisHost, 'REDIS_HOST');
    expect(typeof Settings.RedisPort).toBe('number');
    expect(typeof Settings.RedisDb).toBe('number');
    expect(typeof Settings.RedisDbUser).toBe('number');
    expect(typeof Settings.RedisDbUserDelete).toBe('number');
    expect(typeof Settings.RedisDbAuth).toBe('number');
  });

  test('RabbitMQ Settings', () => {
    expectDefined(Settings.RabbitHost, 'RABBITMQ_HOST');
    expect(typeof Settings.RabbitPort).toBe('number');
    expectDefined(Settings.RabbitUser, 'RABBITMQ_USER');
    expectDefined(Settings.RabbitPassword, 'RABBITMQ_PASSWORD');

    expectDefined(Settings.RabbitExchange, 'RABBITMQ_EXCHANGE');
    expectDefined(Settings.RabbitQueue, 'RABBITMQ_QUEUE');
    expectDefined(Settings.RabbitExchangeUser, 'RABBITMQ_EXCHANGE_USER');
    expectDefined(Settings.RabbitQueueUser, 'RABBITMQ_QUEUE_USER');
    expectDefined(Settings.RabbitExchangePerson, 'RABBITMQ_EXCHANGE_PERSON');
    expectDefined(Settings.RabbitQueuePerson, 'RABBITMQ_QUEUE_PERSON');
  });

  test('Kafka Settings', () => {
    expectDefined(Settings.KafkaBootstrapServers, 'KAFKA_BOOTSTRAP_SERVERS');
    expectDefined(Settings.KafkaTopic, 'KAFKA_TOPIC');
    expectDefined(Settings.KafkaGroupId, 'KAFKA_GROUP_ID');
  });

  test('SQL Server Settings', () => {
    expectDefined(Settings.SqlServerHost, 'SQLSERVER_HOST');
    expect(typeof Settings.SqlServerPort).toBe('number');
    expectDefined(Settings.SqlServerDb, 'SQLSERVER_DB');
    expectDefined(Settings.SqlServerUser, 'SQLSERVER_USER');
    expectDefined(Settings.SqlServerPassword, 'SQLSERVER_PASSWORD');
  });

  test('MongoDB Settings', () => {
    expectDefined(Settings.MongoLogConn, 'MONGO_LOG_CONN');
    expectDefined(Settings.MongoLogDb, 'MONGO_LOG_DB');
    expectDefined(Settings.MongoLogCollection, 'MONGO_LOG_COLLECTION');
  });

  test('GitHub API Settings', () => {
    expectDefined(Settings.GitHubUsername, 'GITHUB_USERNAME');
    expectDefined(Settings.GitHubApiUrl, 'GITHUB_API_URL');
  });

  test('Oracle Settings', () => {
    expectDefined(Settings.OracleHost, 'ORACLE_HOST');
    expect(typeof Settings.OraclePort).toBe('number');
    expectDefined(Settings.OracleSid, 'ORACLE_SID');
    expectDefined(Settings.OracleUser, 'ORACLE_USER');
    expectDefined(Settings.OraclePassword, 'ORACLE_PASSWORD');
    expectDefined(Settings.OracleClientLibDir, 'ORACLE_CLIENT_LIB_DIR');
    expectDefined(Settings.OracleLibDir, 'ORACLE_LIB_DIR');
  });

  test('MySQL Settings', () => {
    expectDefined(Settings.MySqlHost, 'MYSQL_HOST');
    expect(typeof Settings.MySqlPort).toBe('number');
    expectDefined(Settings.MySqlDatabase, 'MYSQL_DATABASE');
    expectDefined(Settings.MySqlUser, 'MYSQL_USER');
    expectDefined(Settings.MySqlPassword, 'MYSQL_PASSWORD');
  });
});
