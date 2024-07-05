import {
  Controller
} from "@nestjs/common";
import { SendMailsService } from "./send-mails.service";

@Controller("send-mails")
export class SendMailsController {
  constructor(private readonly sendMailsService: SendMailsService) {}
}
