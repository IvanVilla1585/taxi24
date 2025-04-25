import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface Config {
  env: string;
  port: number;
  database: TypeOrmModuleOptions;
}

export default (): Config => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: {
    type: 'postgres',
    username: process.env.DB_USER!,
    database: process.env.DB_NAME!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
  },
});
