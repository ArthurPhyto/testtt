import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const { data: movies } = await supabase
    .from('movies')
    .select('id');

  return (movies || []).map((movie) => ({
    id: movie.id.toString() || 'undefined',
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.id) return { title: 'Not Found', description: 'Movie not found' };

  const { data: movie } = await supabase
    .from('movies')
    .select('title_seo, meta_description_seo')
    .eq('id', params.id)
    .single();

  if (!movie) return { title: 'Not Found', description: 'Movie not found' };

  return {
    title: movie.title_seo,
    description: movie.meta_description_seo,
  };
}

export default async function MoviePage({ params }: Props) {
  if (!params.id) notFound();

  const { data: movie } = await supabase
    .from('movies')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!movie) notFound();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="aspect-[2/3] relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg">{movie.overview}</p>
            
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: string) => (
                <Link key={genre} href={`/category/${genre.toLowerCase()}`}>
                  <Button variant="outline" size="sm">{genre}</Button>
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <p><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
              <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
              <p><strong>Cast:</strong> {movie.cast.map((actor: { name: string }) => actor.name).join(', ')}</p>
            </div>
          </div>

          {movie.trailer_url && (
            <div className="aspect-video">
              <iframe
                src={movie.trailer_url}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}