import { Request, Response } from "express";
import nodemailer from "nodemailer";
export const sendEmail = async (_req: Request, res: Response) => {
  // const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "mario.feil@ethereal.email",
      pass: "YRWNdQgJk3Jdm3C6mv",
    },
  });
  const info = await transporter.sendMail({
    from: "J.Alberto Delgado <jaderodev@gmail.com>",
    to: "bar@example.com",
    subject: "Hello",
    html: "<h2>Sending Emails with Node.js</h2>",
  });

  res.json(info);
};
