import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMainMenu } from '@/lib/strapi/menus';

export async function Header() {
  const menu = await getMainMenu();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Store</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              All Products
            </Link>
            {menu?.items.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <ShoppingBag className="size-5" />
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
