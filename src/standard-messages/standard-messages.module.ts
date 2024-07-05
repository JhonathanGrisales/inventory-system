import { Module } from '@nestjs/common';
import { StandardMessagesService } from './standard-messages.service';


@Module({
  controllers: [],
  providers: [StandardMessagesService],
  exports: [StandardMessagesService]
})
export class StandardMessagesModule {}
