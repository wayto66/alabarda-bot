export class NotifyNewLeadDto {
  lead: Lead;
  companyId: number;
}

export class Lead {
  name: string;
  phone: string;
}
