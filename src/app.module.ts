import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ComprehendModule } from './comprehend/comprehend.module';
import { TwilioModule } from './twilio/twilio.module';

@Module({
  imports: [TwilioModule, CommonModule, ComprehendModule],
})
export class AppModule {}
