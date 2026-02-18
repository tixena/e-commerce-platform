export default function CollectionLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs skeleton */}
      <nav className="mb-8 flex items-center gap-1">
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4" />
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4" />
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
      </nav>

      {/* Collection header skeleton */}
      <div className="mb-8">
        <div className="mb-2 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
      </div>

      {/* Product grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
