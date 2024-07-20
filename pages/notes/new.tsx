import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import NoteForm from '../../components/NoteForm';

const NewNote = () => {
  const router = useRouter();

  const handleSubmit = async (data: { title: string; content: string }) => {
    await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.push('/');
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Create New Note</h1>
      <NoteForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default NewNote;
