import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content, topic } = req.body;
    const note = await prisma.note.create({
      data: { title, content, topic },
    });
    res.status(201).json(note);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
