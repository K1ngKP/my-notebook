import { GetStaticPaths, GetStaticProps } from 'next';
import { prisma } from '../../prisma';

const TopicPage = ({ notes, topic }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{topic}</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = [
    'mysql',
    'oop',
    'system-design',
    'operating-systems',
    'networking',
    'api-protocols',
    'dsa-patterns',
  ];

  const paths = topics.map((topic) => ({ params: { topic } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { topic } = context.params;
  const notes = await prisma.note.findMany({
    where: { topic },
  });
  return {
    props: {
      notes,
      topic,
    },
  };
};

export default TopicPage;
