import { Injectable } from '@nestjs/common';
import { EChatType, User } from '@prisma/client';
import { Message } from 'whatsapp-web.js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommandService {
  constructor(private prismaService: PrismaService) {}
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

  public async register_chat(
    chatId: string,
    javelynCompanyId: number,
  ): Promise<string> {
    await this.prismaService.chat.create({
      data: {
        chatId,
        javelynCompanyId,
        type: EChatType.CLIENT_GROUP_CHAT,
      },
    });
    return `Chat registrado com sucesso.`;
  }

  public async help(): Promise<string> {
    return `Eu sou Tera, assistente virtual da Alabarda! Atualmente, minha função é avisar sobre atualizações. 😺`;
  }
}
