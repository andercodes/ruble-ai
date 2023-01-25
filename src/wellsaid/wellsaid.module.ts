import { PollyClient } from '@aws-sdk/client-polly';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WellSaidService } from './wellsaid.service';

function pollyClientFactory(configService: ConfigService) {
  return new PollyClient({
    region: configService.getOrThrow('COMPREHEND_REGION'),
    credentials: {
      accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });
}

@Module({
  providers: [
    {
      provide: PollyClient,
      useFactory: pollyClientFactory,
      inject: [ConfigService],
    },
    WellSaidService,
  ],
  exports: [WellSaidService],
})
export class WellSaidModule {}
