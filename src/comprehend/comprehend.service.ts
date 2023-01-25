import {
  ComprehendClient,
  DetectSentimentCommand,
  SentimentType,
} from '@aws-sdk/client-comprehend';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ComprehendService {
  constructor(private readonly comprehendClient: ComprehendClient) {}

  async getSentiment(input: string): Promise<SentimentType> {
    const command = new DetectSentimentCommand({
      Text: input,
      LanguageCode: 'en',
    });

    const res = await this.comprehendClient.send(command);

    return res.Sentiment as SentimentType;
  }
}
