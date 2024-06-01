import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

// nodemailer 관련 함수
export type ContactType = {
  from: string;
  title: string;
  content: string;
  file?: string;
};

type MailOptionType = {
  to: string;
  from: string;
  subject: string;
  attachments?: Attachment[];
  html: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_APP_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});

export function sendEmail({ from, title, content, file }: ContactType) {
  const mailOptions: MailOptionType = {
    to: process.env.NEXT_APP_EMAIL || "",
    from,
    subject: `[1:1 문의] ${title}`,
    attachments: [
      {
        // filename: file?.name,
        path: file,
        // cid: from + title,
      },
    ],
    html: `
    <h1>${title}</h1>
    <div>${content}</div>
    </br>
    <p>보낸사람 : ${from}</p>
    `,
  };
  return transporter.sendMail(mailOptions);
}
