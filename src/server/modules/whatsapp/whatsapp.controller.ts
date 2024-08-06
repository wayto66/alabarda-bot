import { Body, Controller, Get, Post } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send')
  async sendMessage(
    @Body('to') to: string,
    @Body('message') message: string,
  ): Promise<void> {
    await this.whatsappService.sendMessage(to, message);
  }

  @Get('status')
  async getStatus(): Promise<{ connected: boolean }> {
    const connected = await this.whatsappService.isConnected();
    return { connected };
  }

  @Get('qr')
  async getQr(): Promise<{ qr: string }> {
    const qr = await this.whatsappService.getQr();
    return { qr };
  }
}
