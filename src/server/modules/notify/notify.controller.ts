import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EndpointGuard } from 'src/infra/common/guards/endpoint.guard';
import { NotifyNewLeadDto } from './dto/notify-new-lead.dto';
import { NotifyService } from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post('new-lead')
  @UseGuards(EndpointGuard)
  async newNotify(
    @Body('notifyNewLead') notifyNewLead: NotifyNewLeadDto,
  ): Promise<void> {
    const { lead, companyId } = notifyNewLead;
    await this.notifyService.notifyNewLead(lead, companyId);
  }
}
