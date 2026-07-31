import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '../dto/send-message.dto';

@Injectable()
export class ChatRepository {
  private messages: SendMessageDto[] = [];

  save(message: SendMessageDto): SendMessageDto {
    this.messages.push(message);
    return message;
  }

  findAll(): SendMessageDto[] {
    return this.messages;
  }
}
