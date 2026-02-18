export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <nav className="mb-8 flex items-center gap-1">
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </nav>

      {/* Product details skeleton */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-20 animate-pulse rounded-md bg-muted"
              />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          </div>

          {/* Variant selector skeleton */}
          <div className="space-y-4">
            <div className="h-5 w-16 animate-pulse rounded bg-muted" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-20 animate-pulse rounded-md bg-muted"
                />
              ))}
            </div>
          </div>

          {/* Add to cart button skeleton */}
          <div className="h-12 w-full animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}
