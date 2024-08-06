import { Module } from '@nestjs/common';
import { CommandModule } from '../command/command.module';
import { NotifyModule } from '../notify/notify.module';
import { PrismaModule } from '../prisma/prisma.module';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WhatsAppModule, NotifyModule, CommandModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
