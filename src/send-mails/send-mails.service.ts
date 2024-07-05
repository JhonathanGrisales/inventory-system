import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as sgMail from "@sendgrid/mail";

@Injectable()
export class SendMailsService {
    async sendMail(receiver: string, subject: string, html: string) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
     
      const msg = {
        to: receiver,
        from: process.env.EMAIL_SENDER,
        subject: subject,
        html: html,
      };
      const send_mail =  await sgMail.send(msg);

      if(send_mail[0].statusCode !== 202){
        throw new InternalServerErrorException('Error sending email');
      }
      return send_mail[0].statusCode
    } catch (error) {
      throw new InternalServerErrorException("fail send mail register");
    }
  }
}
