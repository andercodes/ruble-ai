import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { ComprehendModule } from '../comprehend/comprehend.module';
import { GptModule } from '../gpt-3/gpt.module';
import { WellSaidModule } from '../wellsaid/wellsaid.module';
import { TwilioController } from './twilio.controller';
import { TwilioGateway } from './twilio.gateway';
import { TwilioService } from './twilio.service';

function twilioClientFactory(configService: ConfigService): Twilio {
  return new Twilio(
    configService.getOrThrow('TWILIO_SID'),
    configService.getOrThrow('TWILIO_AUTH_TOKEN'),
  );
}

@Module({
  imports: [WellSaidModule, ComprehendModule, GptModule],
  controllers: [TwilioController],
  providers: [
    {
      provide: Twilio,
      useFactory: twilioClientFactory,
      inject: [ConfigService],
    },
    TwilioService,
    TwilioGateway,
  ],
  exports: [TwilioService],
})
export class TwilioModule {}
