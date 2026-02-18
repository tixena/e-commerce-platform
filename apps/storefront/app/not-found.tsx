import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <FileQuestion className="mb-6 size-16 text-muted-foreground" />
      <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
