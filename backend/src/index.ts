import express, { Request, Response } from 'express';
import { createContext } from './tRPC/context';
import { appRouter } from './tRPC/router';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

// tRPC middleware
app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Basic route (still works alongside tRPC)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript and tRPC!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});