import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql-155118-0.cloudclusters.net', //configService.get("POSTGRES_HOST", "localhost"),
      port: 18428, //configService.get("POSTGRES_PORT", 5432),
      username: 'admin', //configService.get("POSTGRES_USER", "postgres"),
      password: 'adminadmin', //configService.get("POSTGRES_PASSWORD", "admin"),
      database: 'local_database', //configService.get("POSTGRES_DB", "local_database"),
      synchronize: true, //should be false at production!
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Product, Customer],
    }),
    UsersModule,
    ProductsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
