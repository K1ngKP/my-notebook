import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"




interface FormData {
  title: string;
  content: string;
}

interface NoteFormProps {
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: FormData;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await onSubmit(data);
      setSubmitError(null);
    } catch (error) {
      setSubmitError('Failed to save the note. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {submitError && <Alert variant="default">{submitError}</Alert>}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <Textarea
          id="content"
          {...register('content', { required: 'Content is required' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
        {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
      </div>
      <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</Button>
    </form>
  );
};

export default NoteForm;
