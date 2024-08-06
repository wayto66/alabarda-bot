import { Controller } from '@nestjs/common';
import { User } from '@prisma/client';
import { Message } from 'whatsapp-web.js';
import { CommandService } from './command.service';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  async hello(user: User): Promise<string> {
    return await this.commandService.hello(user);
  }

  async get_chat_id(_: User, __: string[], msg: Message): Promise<string> {
    return await this.commandService.get_chat_id(_, __, msg);
  }
}
