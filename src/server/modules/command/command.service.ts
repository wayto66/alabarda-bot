import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Message } from 'whatsapp-web.js';

@Injectable()
export class CommandService {
  public async hello(user: User): Promise<string> {
    return `Olá ${user.name}!`;
  }

  public async get_chat_id(
    _: User,
    __: string[],
    msg: Message,
  ): Promise<string> {
    const chat = await msg.getChat();
    const chatId = chat.id._serialized;
    return `O id deste chat é: *${chatId}*`;
  }
}
