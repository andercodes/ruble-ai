import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import {TwilioGateway} from './twilio.gateway';
import { TwilioService } from './twilio.service';

function twilioClientFactory(configService: ConfigService): Twilio {
  return new Twilio(
    configService.getOrThrow('TWILIO_SID'),
    configService.getOrThrow('TWILIO_AUTH_TOKEN'),
  );
}

@Module({
  imports: [],
  providers: [
    {
      provide: Twilio,
      useFactory: twilioClientFactory,
      inject: [ConfigService],
    },
    TwilioService,
    TwilioGateway
  ],
  exports: [TwilioService],
})
export class TwilioModule {}
