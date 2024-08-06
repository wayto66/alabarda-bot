import { forwardRef, Module } from '@nestjs/common';
import { CommandModule } from '../command/command.module';
import { PrismaModule } from '../prisma/prisma.module';
import { WhatsAppController } from './whatsapp.controller';
import { WhatsAppService } from './whatsapp.service';

@Module({
  imports: [PrismaModule, forwardRef(() => CommandModule)],
  controllers: [WhatsAppController],
  providers: [WhatsAppService],
  exports: [WhatsAppService],
})
export class WhatsAppModule {}
