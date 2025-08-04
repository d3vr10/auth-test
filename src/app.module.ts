import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './modules/db/db.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DBModule, UserModule, AuthModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
