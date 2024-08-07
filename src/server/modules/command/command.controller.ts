import { Controller, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  MissingParameterError,
  UnexpectedError,
} from 'src/infra/common/errors/errors';
import { AdminGuard } from 'src/infra/common/guards/admin.guard';
import { Message } from 'whatsapp-web.js';
import { CommandService } from './command.service';

@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  async hello(user: User): Promise<string> {
    return await this.commandService.hello(user);
  }

  @UseGuards(AdminGuard)
  async get_chat_id(_: User, __: string[], msg: Message): Promise<string> {
    return await this.commandService.get_chat_id(_, __, msg);
  }

  @UseGuards(AdminGuard)
  async register_chat(_: User, args: string[], msg: Message): Promise<string> {
    const chat = await msg.getChat();
    const chatId = chat.id._serialized;
    const javelynCompanyId = Number(args.find((arg) => !isNaN(Number(arg))));

    if (!chatId) throw new UnexpectedError('chatId não encontrado.');
    if (!javelynCompanyId) throw new MissingParameterError('Id do cliente');

    return await this.commandService.register_chat(chatId, javelynCompanyId);
  }

  async help(): Promise<string> {
    return await this.commandService.help();
  }
}
