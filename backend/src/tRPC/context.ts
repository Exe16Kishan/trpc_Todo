import { Request, Response } from 'express';

export type Context = {
  req: Request;
  res: Response;
};

export const createContext = ({ req, res }: Context) => ({
  req,
  res,
});