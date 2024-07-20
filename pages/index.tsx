import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';

const Home = ({ notes }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    });
    router.replace(router.asPath);
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Notes</h1>
      <Link href="/notes/new" legacyBehavior>
      <Button><a className="p-2">Create New Note</a></Button>
        
      </Link>
      <ul className="mt-4">
        {notes.map((note) => (
          <li key={note.id} className="mb-2 flex justify-between items-center">
            <Link href={`/notes/${note.id}/edit`} legacyBehavior>
              <a className="text-blue-600">{note.title}</a>
            </Link>
            
            <Button onClick={() => handleDelete(note.id)}>
              Delete</Button>
            
            
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/notes');
  const notes = await res.json();
  return { props: { notes } };
}

export default Home;
