import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import NoteForm from '../../../components/NoteForm';

const EditNote = () => {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      setNote(data);
    };
    if (id) fetchNote();
  }, [id]);

  const handleSubmit = async (data: { title: string; content: string }) => {
    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.push('/');
  };

  if (!note) return <div>Loading...</div>;

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Edit Note</h1>
      <NoteForm initialData={note} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default EditNote;
