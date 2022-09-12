import * as nodemailer from "nodemailer";
import * as SMTPTransport from "nodemailer/lib/smtp-transport";
import { EmailServiceConfig } from "./EmailConfig";

export interface MailDataInterface {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private dependencies: EmailServiceConfig) {
    this.transporter = nodemailer.createTransport( {
        host: this.dependencies.host,
        secureConnection: this.dependencies.secureConnection,
        port: this.dependencies.port,
        auth: {
            user: this.dependencies.user,
            pass: this.dependencies.password
        },
        tls: {
            ciphers: this.dependencies.ciphers
        }
    } as SMTPTransport.Options )
  }

  async sendMail(mailData: MailDataInterface) {
    this.transporter.sendMail(mailData);
  }
}
