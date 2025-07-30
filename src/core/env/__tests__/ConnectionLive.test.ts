import { describe, test, expect } from 'vitest';
import { Settings } from '@/core/env/Settings';
import { createClient } from 'redis';
import sql from 'mssql';
import amqp from 'amqplib';
import { MongoClient } from 'mongodb';
import { Kafka } from 'kafkajs';

describe('Live Connection Tests', () => {
  test('Redis should connect and respond to PING', async () => {
    const client = createClient({
      socket: {
        host: Settings.RedisHost,
        port: Settings.RedisPort
      },
      password: Settings.RedisPassword || undefined
    });

    await client.connect();
    const pong = await client.ping();
    await client.disconnect();

    expect(pong).toBe('PONG');
  });

  test('SQL Server should connect', async () => {
    const pool = await sql.connect({
      user: Settings.SqlServerUser,
      password: Settings.SqlServerPassword,
      server: Settings.SqlServerHost,
      database: Settings.SqlServerDb,
      port: Settings.SqlServerPort,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    });

    const result = await pool.query('SELECT 1 AS ok');
    expect(result.recordset[0].ok).toBe(1);
    await pool.close();
  });

  test('MongoDB should connect', async () => {
    const client = new MongoClient(Settings.MongoLogConn);
    await client.connect();
    const db = client.db(Settings.MongoLogDb);
    const collections = await db.listCollections().toArray();
    expect(Array.isArray(collections)).toBe(true);
    await client.close();
  });

  test('RabbitMQ should connect and publish', async () => {
    const url = `amqp://${Settings.RabbitUser}:${Settings.RabbitPassword}@${Settings.RabbitHost}:${Settings.RabbitPort}`;
    const conn = await amqp.connect(url);
    const channel = await conn.createChannel();

    await channel.assertQueue('test-queue');
    const ok = channel.sendToQueue('test-queue', Buffer.from('test message'));

    expect(ok).toBe(true);

    await channel.close();
    await conn.close();
  });

  test('Kafka should connect and publish to topic', async () => {
    const kafka = new Kafka({
      brokers: [Settings.KafkaBootstrapServers],
      clientId: 'test-client'
    });

    const producer = kafka.producer();
    await producer.connect();

    const result = await producer.send({
      topic: Settings.KafkaTopic,
      messages: [{ value: 'test message' }]
    });

    expect(result.length).toBeGreaterThan(0);

    await producer.disconnect();
  });

  test('Redis Pub/Sub should work', async () => {
    const publisher = createClient({
      socket: {
        host: Settings.RedisHost,
        port: Settings.RedisPort
      },
      password: Settings.RedisPassword || undefined
    });

    const subscriber = createClient({
      socket: {
        host: Settings.RedisHost,
        port: Settings.RedisPort
      },
      password: Settings.RedisPassword || undefined
    });

    await publisher.connect();
    await subscriber.connect();

    const channel = 'test-channel';
    let received = '';

    const receivedPromise = new Promise<string>((resolve) => {
      subscriber.subscribe(channel, (message) => {
        received = message;
        resolve(message);
      });
    });

    await publisher.publish(channel, 'hello world');
    const message = await receivedPromise;

    expect(message).toBe('hello world');

    await subscriber.quit();
    await publisher.quit();
  });
});
