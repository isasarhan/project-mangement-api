import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

interface Replacements {
    [key: string]: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));

const generateHtml = (templatePath: string, replacements: Replacements): string => {
    const fullPath = path.resolve(__dirname, '../../public', templatePath);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Template file not found at path: ${fullPath}`);
    }

    const template = fs.readFileSync(fullPath, 'utf8');
    let html = template;
    for (const [key, value] of Object.entries(replacements)) {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return html;
};

const transporter: Transporter = nodemailer.createTransport({
    host: 'mail.serhan-jewelry.com',
    port: 465,
    // auth: {
    //     user: 'test@serhan-jewelry.com',
    //     pass: "StrongPassword123!"
    // }
});

interface SendResetEmailParams {
    email: string;
    username: string;
    resetToken: string | undefined;
}

const sendResetEmail = async ({ email, username, resetToken }: SendResetEmailParams) => {
    const resetLink = `http://serhan-jewelry.com/reset/${resetToken}`;
    const html = generateHtml('passwordResetTemplate.html', {
        username,
        resetLink,
        currentYear: new Date().getFullYear().toString()
    });

    const mailOptions: nodemailer.SendMailOptions = {
        from: 'info@yourdomain.com',
        to: email,
        subject: 'Password Reset Request',
        html
    };

    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (error) {
        console.error('Error sending email:', error);
        return false
    }
};

export { sendResetEmail };
