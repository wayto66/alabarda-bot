import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ECommand } from 'src/common/enums/command.enum';
import { Message } from 'whatsapp-web.js';
import { CommandController } from './command.controller';

export interface IParseCommandResponse {
  method: (
    user: User | null,
    args: string[],
    msg: Message,
  ) => Promise<string> | null;
  args: string[];
  ignore?: boolean;
}

@Injectable()
export class CommandParser {
  constructor(private readonly commandController: CommandController) {}
  private commandValidator = 'yin';

  private commandStringMap: Record<string, ECommand> = {
    oi: ECommand.HELLO,
    ola: ECommand.HELLO,
    chatid: ECommand.GET_CHAT_ID,
  };

  public parseCommand(message: string): IParseCommandResponse | null {
    if (!message.includes(this.commandValidator))
      return {
        method: null,
        args: [],
        ignore: true,
      };

    let args = message.trim().split(' ');

    args = args.filter(
      (arg) => arg.length > 0 && arg !== this.commandValidator,
    );

    const commandKey = args[0];
    const methodName = this.commandStringMap[commandKey];

    if (!methodName || typeof this.commandController[methodName] !== 'function')
      return {
        method: null,
        args: [],
      };

    return {
      method: this.commandController[methodName].bind(this.commandController),
      args,
    };
  }
}
