import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { Twilio } from 'twilio';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

@Injectable()
export class TwilioService {
  constructor(
    private readonly twilioClient: Twilio,
    private readonly configService: ConfigService
  ) {}

  async test(): Promise<unknown> {
    const twiml = new VoiceResponse();

    twiml.say('I will play audio through websocket')

    twiml.connect().stream({
      url: this.configService.getOrThrow('TWILIO_GATEWAY_URL'),
    })

    twiml.pause({ length: 10 })

    const res = await this.twilioClient.calls.create({
      from: '+13855262652',
      to: '+16149023666',
      twiml: twiml.toString()
    });

    console.log(res.streams());

    return res;
  }
}
