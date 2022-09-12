import * as dotenv from "dotenv"
import * as express from 'express';
import { AppConfig, appConfigFactory } from "./config/appConfig";
import { celebrate, Joi, Segments } from "celebrate";
import {EmailService} from "./EmailService"
import { InvitationEmailService } from "./InvitationEmailService";
import { emailServiceConfigFactory } from "./EmailConfig";
import { invitationEmailServiceConfigFactory } from "./InvitationEmailConfig";

interface Foo {
    email: string;
    userId: string;
}

class App {
    private server: express.Express;
    private appConfig: AppConfig;

    public init(): void {
        this.server = express();
        dotenv.config();
        this.appConfig = appConfigFactory(process.env);    
        this.setupRoutes();
        this.runServer();
    }

    private setupRoutes(): void {
        this.server.get('/', celebrate({
            body: {
                email: Joi.string().required(),
                userId: Joi.string().required()
            }
          }),(req: express.Request<{}, {}, Foo, {}>, res: express.Response) => {
            const emailService = new EmailService(emailServiceConfigFactory(process.env));
            const invitationEmailService = new InvitationEmailService(emailService, invitationEmailServiceConfigFactory(process.env))

            invitationEmailService.sendEmail(req.body.email as string, req.body.userId as string)
            res.send(`Nodejs, TypeScript, Express App with arg ${req.body.email}`);
          });
    }

    private runServer(): void{
        this.server.listen(this.appConfig.port, () => {
            console.log(`listening on port: ${this.appConfig.port}`);
          });
    }
}

export default App;