import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { MovieGrid } from '@/components/MovieGrid';
import { Pagination } from '@/components/Pagination';
import { notFound } from 'next/navigation';
import { generateSlug } from '@/lib/utils';

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateStaticParams() {
  const { data: categories } = await supabase
    .from('categorie')
    .select('name');

  return (categories || []).map((category) => ({
    slug: generateSlug(category.name),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params.slug) return { title: 'Not Found', description: 'Category not found' };

  const { data: categories } = await supabase
    .from('categorie')
    .select('name');

  const category = categories?.find(
    (cat) => generateSlug(cat.name) === params.slug
  );

  if (!category) return { title: 'Not Found', description: 'Category not found' };

  return {
    title: `${category.name} Movies`,
    description: `Browse all ${category.name} movies in our collection`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  if (!params.slug) notFound();

  const { data: categories } = await supabase
    .from('categorie')
    .select('name');

  const category = categories?.find(
    (cat) => generateSlug(cat.name) === params.slug
  );

  if (!category) notFound();

  const currentPage = Number(searchParams.page) || 1;
  const moviesPerPage = 30;
  const offset = (currentPage - 1) * moviesPerPage;

  const { data: movies, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .contains('genres', [category.name])
    .order('release_date', { ascending: false })
    .range(offset, offset + moviesPerPage - 1);

  const totalPages = count ? Math.ceil(count / moviesPerPage) : 1;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{category.name} Movies</h1>
      <MovieGrid movies={movies || []} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${params.slug}`}
      />
    </main>
  );
}