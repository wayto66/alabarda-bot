import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsAppService } from '../whatsapp/whatsapp.service';
import { Lead } from './dto/notify-new-lead.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly whatsappService: WhatsAppService,
  ) {}

  async notifyNewLead(lead: Lead, companyId: number): Promise<void> {
    const chat = await this.prismaService.chat.findFirst({
      where: {
        javelynCompanyId: companyId,
      },
    });
    if (!chat) {
      throw new Error(`No chat found for identifier ${companyId}`);
    }

    const message = `✨ *Novo Lead!* ✨
  🧑 - ${lead.name}
  
  🔗 - https://javelyn.com.br
  💬 - https://wa.me/${lead.phone}`;

    await this.whatsappService.sendMessage(chat.chatId, message);
  }
}
