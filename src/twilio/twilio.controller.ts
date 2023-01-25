import { Body, Controller, Post } from '@nestjs/common';
import { CreateCallDto } from './dto/createCall.dto';
import { TwilioService } from './twilio.service';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('calls')
  async createCall(@Body() input: CreateCallDto): Promise<void> {
    await this.twilioService.createCall(input);
  }
}
