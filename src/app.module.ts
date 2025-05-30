import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { Client } from './client/entities/client.entity';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { Service } from './services/entities/service.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'fmkZ!302_',
      database: 'videoproduct',
      entities: [Client, Service, Order],
      synchronize: true, 
    }),
      ClientModule,
      ProjectsModule,
      ServicesModule,
      OrdersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
