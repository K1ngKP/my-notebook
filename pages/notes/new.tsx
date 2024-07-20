import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import NoteForm from '../../components/NoteForm';
import { Alert } from '@/components/ui/alert';
import { useState } from 'react';

interface FormData {
  title: string;
  content: string;
}

const NewNotePage = () => {
  const router = useRouter();
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleCreateNote: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess('Note created successfully!');
        router.push('/');
      } else {
        throw new Error('Failed to create note');
      }
    } catch (error) {
      setSubmitSuccess(null);
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Note</h1>
      {submitSuccess && <Alert variant="default">{submitSuccess}</Alert>}
      <NoteForm onSubmit={handleCreateNote} />
    </div>
  );
};

export default NewNotePage;
