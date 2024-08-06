import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [WhatsAppModule, PrismaModule],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
