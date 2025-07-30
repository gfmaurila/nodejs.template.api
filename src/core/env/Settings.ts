export class Settings {
  static AppName = process.env.APP_NAME!;
  static Environment = process.env.ENVIRONMENT!;
  static Debug = process.env.DEBUG === 'true';

  static SecretKey = process.env.SECRET_KEY!;
  static Issuer = process.env.ISSUER!;
  static Audience = process.env.AUDIENCE!;

  // Redis
  static RedisHost = process.env.REDIS_HOST!;
  static RedisPort = parseInt(process.env.REDIS_PORT || '6379');
  static RedisDb = parseInt(process.env.REDIS_DB || '0');
  static RedisDbUser = parseInt(process.env.REDIS_DB_USER || '1');
  static RedisDbUserDelete = parseInt(process.env.REDIS_DB_USER_DELETE || '2');
  static RedisDbAuth = parseInt(process.env.REDIS_DB_AUTH || '4');
  static RedisPassword = process.env.REDIS_PASSWORD || '';

  // RabbitMQ
  static RabbitHost = process.env.RABBITMQ_HOST!;
  static RabbitPort = parseInt(process.env.RABBITMQ_PORT || '5672');
  static RabbitUser = process.env.RABBITMQ_USER!;
  static RabbitPassword = process.env.RABBITMQ_PASSWORD!;

  static RabbitExchange = process.env.RABBITMQ_EXCHANGE!;
  static RabbitQueue = process.env.RABBITMQ_QUEUE!;
  static RabbitExchangeUser = process.env.RABBITMQ_EXCHANGE_USER!;
  static RabbitQueueUser = process.env.RABBITMQ_QUEUE_USER!;
  static RabbitExchangePerson = process.env.RABBITMQ_EXCHANGE_PERSON!;
  static RabbitQueuePerson = process.env.RABBITMQ_QUEUE_PERSON!;

  // Kafka
  static KafkaBootstrapServers = process.env.KAFKA_BOOTSTRAP_SERVERS!;
  static KafkaTopic = process.env.KAFKA_TOPIC!;
  static KafkaGroupId = process.env.KAFKA_GROUP_ID!;

  // SQL Server
  static SqlServerHost = process.env.SQLSERVER_HOST!;
  static SqlServerPort = parseInt(process.env.SQLSERVER_PORT!);
  static SqlServerDb = process.env.SQLSERVER_DB!;
  static SqlServerUser = process.env.SQLSERVER_USER!;
  static SqlServerPassword = process.env.SQLSERVER_PASSWORD!;

  // Mongo Log
  static MongoLogConn = process.env.MONGO_LOG_CONN!;
  static MongoLogDb = process.env.MONGO_LOG_DB!;
  static MongoLogCollection = process.env.MONGO_LOG_COLLECTION!;

  // GitHub
  static GitHubUsername = process.env.GITHUB_USERNAME!;
  static GitHubApiUrl = process.env.GITHUB_API_URL!;
  static GitHubToken = process.env.GITHUB_TOKEN || '';

  // Oracle
  static OracleHost = process.env.ORACLE_HOST!;
  static OraclePort = parseInt(process.env.ORACLE_PORT!);
  static OracleSid = process.env.ORACLE_SID!;
  static OracleUser = process.env.ORACLE_USER!;
  static OraclePassword = process.env.ORACLE_PASSWORD!;
  static OracleClientLibDir = process.env.ORACLE_CLIENT_LIB_DIR!;
  static OracleLibDir = process.env.ORACLE_LIB_DIR!;

  // MySQL
  static MySqlHost = process.env.MYSQL_HOST!;
  static MySqlPort = parseInt(process.env.MYSQL_PORT!);
  static MySqlDatabase = process.env.MYSQL_DATABASE!;
  static MySqlUser = process.env.MYSQL_USER!;
  static MySqlPassword = process.env.MYSQL_PASSWORD!;
}
