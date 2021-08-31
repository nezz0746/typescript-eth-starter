// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default function helloAPI(req: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({ name: 'John Doe' });
}
