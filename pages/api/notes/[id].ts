import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
    });
    res.json(note);
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const updatedNote = await prisma.note.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json(updatedNote);
  } else if (req.method === 'DELETE') {
    await prisma.note.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).end();
  }
};
