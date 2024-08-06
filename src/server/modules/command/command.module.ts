import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WhatsAppModule } from '../whatsapp/whatsapp.module';
import { CommandController } from './command.controller';
import { CommandParser } from './command.parser';
import { CommandService } from './command.service';

@Module({
  imports: [forwardRef(() => WhatsAppModule), PrismaModule],
  providers: [CommandService, CommandParser, CommandController],
  controllers: [CommandController],
  exports: [CommandParser],
})
export class CommandModule {}
