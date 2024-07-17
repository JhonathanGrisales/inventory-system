import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class SendMailsService {
  async sendMail(receiver: string, subject: string, html: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "jgrisalesg@gmail.com",
          pass: "ayccqgvvmgfgrqtr",
        },
      });

      const msg = {
        to: receiver,
        from: process.env.EMAIL_SENDER,
        subject: subject,
        html: html,
      };

      return await transporter.sendMail(msg);

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("fail send mail register");
    }
  }
}
