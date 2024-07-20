import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const newNote = await prisma.note.create({
      data: { title, content },
    });
    res.json(newNote);
  } else {
    res.status(405).end();
  }
};
