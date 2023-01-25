import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { CreateCallDto } from './dto/createCall.dto';

@Injectable()
export class TwilioService {
  constructor(
    private readonly twilioClient: Twilio,
    private readonly configService: ConfigService,
  ) {}

  async createCall(input: CreateCallDto): Promise<void> {
    const twiml = new VoiceResponse();

    twiml.connect().stream({
      url: this.configService.getOrThrow('TWILIO_GATEWAY_URL'),
    });

    await this.twilioClient.calls.create({
      from: '+13855262652',
      to: input.phone,
      twiml: twiml.toString(),
    });
  }
}
