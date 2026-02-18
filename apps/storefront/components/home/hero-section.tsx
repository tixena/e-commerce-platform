import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover Quality Products
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Shop our curated collection of premium products. From everyday essentials
            to unique finds, we have everything you need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg">
                Shop Now
              </Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/50 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  );
}
