import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
  };
  onSubmit: (data: { title: string; content: string }) => void;
}

const NoteForm = ({ initialData = { title: '', content: '' }, onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <Input type='text' value={title}
          onChange={(e) => setTitle(e.target.value)}></Input>
        
      </div>
      <div>
        <label>Content</label>
        
        <Textarea value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 ">

        </Textarea>
      </div>
      <Button type='submit' className="border p-4">Save</Button>
      
    </form>
  );
};

export default NoteForm;
