import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { database_credentials } from './app/configs/app';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/entities/client.entity';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: database_credentials.type,
      host: database_credentials.host,
      port: database_credentials.port,
      username: database_credentials.username,
      password: database_credentials.password,
      database: database_credentials.database,
      entities: [
        User, Client
      ],
      synchronize: true,
    }),
    AuthModule, 
    UsersModule, 
    ClientsModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
