import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as qrcode from 'qrcode-terminal';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import { CommandParser } from '../command/command.parser';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhatsAppService implements OnModuleInit {
  public client: Client;
  private qr: string;

  @Inject(forwardRef(() => CommandParser))
  private commandParser: CommandParser;

  constructor(private readonly prismaService: PrismaService) {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      webVersion: '2.2412.54',
      webVersionCache: {
        type: 'remote',
        remotePath:
          'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
      },

      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-extensions',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-background-networking',
          '--disable-translate',
          '--disable-bundled-ppapi-flash',
        ],
      },
    });

    this.client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr);
      qrcode.generate(qr, { small: true });
      this.qr = qr;
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.on('authenticated', () => {
      console.log('Authenticated');
    });

    this.client.on('loading_screen', (percent: string, message: string) =>
      console.log('LOADING SCREEN', percent, message),
    );

    this.client.on('auth_failure', (msg) => {
      console.error('AUTHENTICATION FAILURE', msg);
    });
  }

  async onModuleInit() {
    await this.client.initialize();
    this.client.on('message', (msg) => this.handleMessageReceive(msg));
  }

  async sendMessage(to: string, message: string): Promise<void> {
    await this.client.sendMessage(to, message);
  }

  async isConnected(): Promise<boolean> {
    return this.client.info !== null;
  }

  async getQr(): Promise<string> {
    return this.qr;
  }

  async handleMessageReceive(msg: Message) {
    const { args, method } = this.commandParser.parseCommand(msg.body);
    console.log('method', method);
    if (!method) {
      msg.react('❔');
      return;
    }

    const phone = this.getUserPhone(msg);
    const contact = await msg.getContact();

    const user = await this.prismaService.user.upsert({
      where: {
        phone,
      },
      create: {
        phone,
        name:
          contact.pushname ??
          contact.name ??
          contact.shortName ??
          'Nome indefinido',
      },
      update: {},
    });

    const response = await method(user, args, msg);
    msg.reply(response);
  }

  getUserPhone = (msg: Message): string => {
    if (!msg.author) return msg.from;

    const match = msg.author.match(/^(\d+):(\d+)@c\.us$/);
    if (match) {
      return `${match[1]}@c.us`;
    }

    return msg.author;
  };
}
