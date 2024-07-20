import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, content, topic } = req.body;
    const note = await prisma.note.update({
      where: { id: Number(id) },
      data: { title, content, topic },
    });
    res.status(200).json(note);
  } else if (req.method === 'DELETE') {
    await prisma.note.delete({
      where: { id: Number(id) },
    });
    res.status(204).end(); // No Content
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
