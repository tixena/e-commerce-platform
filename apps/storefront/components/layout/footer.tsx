import Link from 'next/link';
import { getFooterMenu } from '@/lib/strapi/menus';

export async function Footer() {
  const menu = await getFooterMenu();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold">
              Store
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for quality products.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Links</h3>
            <ul className="space-y-2">
              {menu?.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cart"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
