import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurants/restaurants.module';


@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
  MongooseModule.forRoot(process.env.DB_URI || 'mongodb://localhost:27017/library-nest-api'),RestaurantsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
