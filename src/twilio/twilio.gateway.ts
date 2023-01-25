import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { Readable, Writable } from 'stream';
import { WellSaidService } from '../wellsaid/wellsaid.service';
import * as ffmpeg from 'fluent-ffmpeg';
import { ComprehendService } from '../comprehend/comprehend.service';
import { GptService } from '../gpt-3/gpt.service';
import { SynthesizeSpeechOutput } from '@aws-sdk/client-polly';

@WebSocketGateway({ cors: true })
export class TwilioGateway implements OnGatewayInit {
  constructor(
    private readonly wellSaidService: WellSaidService,
    private readonly comprehendService: ComprehendService,
    private readonly gptService: GptService,
  ) {}

  afterInit(server: any) {
    server.on('connection', (ws: any) => {
      ws.on('error', console.error);

      ws.on('message', async (data: Buffer) => {
        const parsedData = JSON.parse(data.toString());

        let speech: SynthesizeSpeechOutput;
        let rawAudioStream: Writable;

        switch (parsedData.event) {
          case 'media':
            break;

          case 'start':

            for (const client of server.clients) {
              client.send(
                JSON.stringify({
                  event: 'start',
                  streamSid: parsedData.start.streamSid,
                }),
              );
            }

            speech = await this.wellSaidService.generateSpeech('hello world');

            rawAudioStream = ffmpeg(speech.AudioStream as Readable)
              .toFormat('mulaw')
              .audioBitrate(8)
              .audioFrequency(8000)
              .audioChannels(1)
              .pipe();

            rawAudioStream.on('data', (streamData: Buffer) => {
              const res = {
                event: 'media',
                streamSid: parsedData.start.streamSid,
                media: {
                  payload: streamData.toString('base64'),
                },
              };

              ws.send(JSON.stringify(res));
            });

            break;

          case 'message':
            const sentiment = await this.comprehendService.getSentiment(
              parsedData.message,
            );
            const response = await this.gptService.generateResponse(
              parsedData.message,
            );
            speech = await this.wellSaidService.generateSpeech(response);

            rawAudioStream = ffmpeg(speech.AudioStream as Readable)
              .toFormat('mulaw')
              .audioBitrate(8)
              .audioFrequency(8000)
              .audioChannels(1)
              .pipe();

            rawAudioStream.on('data', (streamData: Buffer) => {
              const res = {
                event: 'media',
                streamSid: parsedData.streamSid,
                media: {
                  payload: streamData.toString('base64'),
                },
              };

              for (const client of server.clients) {
                client.send(JSON.stringify(res));
              }
            });

            ws.send(
              JSON.stringify({
                event: 'message',
                sentiment,
                message: parsedData.message,
                response: response,
              }),
            );
            break;
        }
      });
    });
  }
}
