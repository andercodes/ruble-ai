import { ComprehendClient } from '@aws-sdk/client-comprehend';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GptModule } from '../gpt-3/gpt.module';
import { WellSaidModule } from '../wellsaid/wellsaid.module';
import { ComprehendService } from './comprehend.service';

function comprehendClientFactory(
  configService: ConfigService,
): ComprehendClient {
  return new ComprehendClient({
    region: configService.getOrThrow('COMPREHEND_REGION'),
    credentials: {
      accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });
}

@Module({
  imports: [GptModule, WellSaidModule],
  providers: [
    {
      provide: ComprehendClient,
      useFactory: comprehendClientFactory,
      inject: [ConfigService],
    },
    ComprehendService,
  ],
  exports: [ComprehendClient, ComprehendService],
})
export class ComprehendModule {}
