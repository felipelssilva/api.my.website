import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ContactsModule } from './contacts/contacts.module';
import { ProjectsModule } from './projects/projects.module';
import { CertificatesModule } from './certificates/certificates.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { TypeormService } from './config/typeorm/typeorm.service';
// import { GraphqlService } from './config/graphql/graphql.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { GraphqlModule } from './config/graphql/graphql.module';
import { TypeormModule } from './config/typeorm/typeorm.module';

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeormModule,
    UserModule,
    ContactsModule,
    ProjectsModule,
    CertificatesModule,
  ],
})
export class AppModule {}
