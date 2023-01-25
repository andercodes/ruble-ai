import { SentimentType } from '@aws-sdk/client-comprehend';
import { Controller, Get, Query } from '@nestjs/common';
import { GptService } from '../gpt-3/gpt.service';
import { TwilioService } from '../twilio/twilio.service';
import { WellSaidService } from '../wellsaid/wellsaid.service';
import { ComprehendService } from './comprehend.service';
import { SentimentInputDto } from './dto/sentimentInput.dto';

@Controller('comprehend')
export class ComprehendController {
  constructor(
    private readonly comprehendService: ComprehendService,
    private readonly gptService: GptService,
    private readonly wellSaidService: WellSaidService,
    private readonly twilioService: TwilioService,
  ) {}

  @Get('sentiment')
  async getSentiment(
    @Query() input: SentimentInputDto,
  ): Promise<unknown> {
    //const sentiment = await this.comprehendService.getSentiment(input.text);

    //const response = await this.gptService.generateResponse(input.text);

    //const speech = await this.wellSaidService.generateSpeech(input.text);

    const twilioRes = await this.twilioService.test();

    return true;
  }
}
