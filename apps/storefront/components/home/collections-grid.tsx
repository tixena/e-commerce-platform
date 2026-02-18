import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCollections } from '@/lib/strapi/collections';

export async function CollectionsGrid() {
  const collections = await getCollections();

  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Shop by Collection</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our carefully curated collections
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.handle}`}>
              <Card className="group h-full transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {collection.title}
                    <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </CardTitle>
                </CardHeader>
                {collection.description && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
