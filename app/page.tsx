import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { MovieGrid } from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { generateSlug } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Movie Streaming - Latest Releases',
  description: 'Discover the latest movies and watch them online',
};

export default async function Home() {
  const { data: movies } = await supabase
    .from('movies')
    .select('*')
    .order('release_date', { ascending: false })
    .limit(30);

  const { data: categories } = await supabase
    .from('categorie')
    .select('*')
    .order('name');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Releases</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Link key={category.id} href={`/category/${generateSlug(category.name)}`}>
              <Button variant="outline">{category.name}</Button>
            </Link>
          ))}
        </div>
      </div>

      <MovieGrid movies={movies || []} />
    </main>
  );
}