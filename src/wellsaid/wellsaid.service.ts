import {
  PollyClient,
  StartSpeechSynthesisTaskCommand,
  SynthesizeSpeechCommand,
} from '@aws-sdk/client-polly';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WellSaidService {
  constructor(private readonly pollyClient: PollyClient) {}

  async generateSpeech(input: string): Promise<unknown> {
    const command = new SynthesizeSpeechCommand({
      OutputFormat: 'mp3',
      Text: input,
      TextType: 'text',
      VoiceId: 'Joanna',
      SampleRate: '22050',
    });

    const res = await this.pollyClient.send(command);

    return res;
  }
}
