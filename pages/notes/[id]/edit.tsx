import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import NoteForm from '../../../components/NoteForm';
import { prisma } from '../../../lib/prisma';

const EditNotePage = ({ note }) => {
  const router = useRouter();

  const handleEditNote: SubmitHandler<FormData> = async (data) => {
    await fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.push('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <NoteForm onSubmit={handleEditNote} defaultValues={note} />
    </div>
  );
};

export default EditNotePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const note = await prisma.note.findUnique({
    where: { id: Number(id) },
  });
  return {
    props: {
      note,
    },
  };
};
