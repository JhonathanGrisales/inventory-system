import { Module } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';
import { SendMailsController } from './send-mails.controller';

@Module({
  controllers: [SendMailsController],
  providers: [SendMailsService],
  exports: [SendMailsService]
})
export class SendMailsModule {}
