const nodemailer = require('nodemailer')
const pass = require('../pass')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: pass.SMTP_USER,
                pass: pass.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail (to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Name of product - account activation',
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>           
                `
        })
    }
}

module.exports = new MailService()
