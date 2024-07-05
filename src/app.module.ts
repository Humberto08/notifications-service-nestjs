import { Module } from '@nestjs/common';
import { AppController } from './infra/app.controller';
import { PrismaService } from './infra/prisma.service';
// import { HttpModule } from './http.module';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
