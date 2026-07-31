import { Injectable } from '@nestjs/common';
import { ChatRepository } from './repository/chat.repository';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  saveMessage(message: SendMessageDto): SendMessageDto {
    return this.chatRepository.save(message);
  }

  getMessages(): SendMessageDto[] {
    return this.chatRepository.findAll();
  }
}
