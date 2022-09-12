import {EmailService} from "./EmailService"
import { InvitationEmailService } from "./InvitationEmailService";
import { emailServiceConfigFactory } from "./EmailConfig";
import { invitationEmailServiceConfigFactory } from "./InvitationEmailConfig";

const emailService = new EmailService(emailServiceConfigFactory(process.env));
const invitationEmailService = new InvitationEmailService(emailService, invitationEmailServiceConfigFactory(process.env))

invitationEmailService.sendEmail(req.body.email as string, req.body.userId as string)