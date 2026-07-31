import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ): SendMessageDto {
    console.log('Received:', data, 'from', client.id);

    const saved =
      (
        this.chatService as unknown as {
          saveMessage?: (message: SendMessageDto) => SendMessageDto;
        }
      ).saveMessage?.(data) ?? data;

    this.server.emit('newMessage', saved);

    return saved;
  }
}
