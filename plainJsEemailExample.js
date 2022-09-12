const nodemailer = require( 'nodemailer' )
const { config } = require( './config' );
const jwt = require( 'jsonwebtoken' );

const transporter = nodemailer.createTransport( {
	host: config.get( 'email.smtp.host' ),
	port: 123,
	auth: {
		user: config.get( 'email.smtp.user' ),
		pass: config.get( 'email.smtp.password' )
	},
	tls: {
		ciphers: 'SSLv3'
	}
} )

const generateInvitationToken = ( userId ) => {
	const jwtSecretKey = config.get( "invitationEmail.jwtSecret" );
	const data = {
		time: Date(),
		userId
	}
	return jwt.sign( data, jwtSecretKey );
}

const sendInvitationEmail = async( req, res ) =>{
	const senderEmail = config.get("email.sender.email")

	const userId = req.body.userId
	const invitationToken = generateInvitationToken( userId )

	const mail = {
		to: req.body.recipientEmail,
		from: `<${senderEmail}>`,
		subject: 'Invitation email to app',
		text: `Invitation to the app ${invitationToken}`
	}
	await transporter.sendMail( mail )
}


const sendRequestEmail = async( req, res ) => {
	const senderEmail = config.get("email.sender.email")

	const userId = req.body.userId
	const invitationToken = generateInvitationToken( userId )

	const mail = {
		to: req.body.recipientEmail,
		from: `<${senderEmail}>`,
		subject: 'Request email for the app',
		text: `Request for the app ${invitationToken}`
	}
	await transporter.sendMail( mail )
}

const sendEmail = async( req, res ) => {
	if(req.body.emailType === "requestMail"){
		await sendRequestEmail(req, res)
	} else {
		await sendInvitationEmail(req, res)
	}
}

module.exports = sendEmail
