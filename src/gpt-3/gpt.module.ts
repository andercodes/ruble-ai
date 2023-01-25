import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { GptService } from './gpt.service';

function openAiFactory(configService: ConfigService): OpenAIApi {
  const config = new Configuration({
    apiKey: configService.getOrThrow('OPENAI_API_KEY'),
  });

  return new OpenAIApi(config);
}

@Module({
  providers: [
    {
      provide: OpenAIApi,
      useFactory: openAiFactory,
      inject: [ConfigService],
    },
    GptService,
  ],
  exports: [GptService],
})
export class GptModule {}
