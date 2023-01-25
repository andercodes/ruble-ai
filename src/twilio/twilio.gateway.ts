import {MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";

@WebSocketGateway({ cors: true })
export class TwilioGateway implements OnGatewayConnection, OnGatewayDisconnect {

  handleConnection(client: any, ...args: any[]) {
    console.log('connected')
  }

  handleDisconnect(client: any) {
    console.log('disconnected')
  }

  @SubscribeMessage('start')
  handleStart(
    @MessageBody() body: unknown
  ) {
    console.log('start', body);
  }

  @SubscribeMessage('media')
  handleMedia(
    @MessageBody() body: unknown
  ) {
    console.log('media', body);
  }

  @SubscribeMessage('stop')
  handleStop(
    @MessageBody() body: unknown
  ) {
    console.log('stop', body);
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() body: unknown
  ) {
    console.log('message', body);
  }


}
