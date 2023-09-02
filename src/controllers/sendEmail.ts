import { Request, Response } from "express";
export const sendEmail = async (_req: Request, res: Response) => {
  res.send("send email route");
};
