import invitationEmailTemplate from "./InvitationTemplate";
import { EmailService } from "./EmailService";
import * as jwt from "jsonwebtoken"
import { InvitationEmailConfig } from "./InvitationEmailConfig"

export class InvitationEmailService {
    
    constructor(private invitationEmailServiceDependencies: EmailService, private invitationEmailConfigDependencies: InvitationEmailConfig) {}

    private generateInvitationToken(userId: string): string {
      const jwtSecretKey = this.invitationEmailConfigDependencies.jwtSecret;
      const data = {
        time: Date(),
        userId,
      }
      return jwt.sign( data, jwtSecretKey );
    }

    async sendEmail(email: string, userId: string): Promise<boolean> {
  
      await this.invitationEmailServiceDependencies.sendMail({
        from: invitationEmailTemplate.from,
        to: email,
        subject: invitationEmailTemplate.emailSubject,
        text: `${invitationEmailTemplate.emailBody} ${this.generateInvitationToken(userId)}`
      });
      return true;
    }
}
