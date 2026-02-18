'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn, getStrapiImageUrl } from '@/lib/utils';
import type { StrapiMedia } from '@/types';

interface ProductGalleryProps {
  featuredImage: StrapiMedia;
  images?: StrapiMedia[];
}

export function ProductGallery({ featuredImage, images }: ProductGalleryProps) {
  const allImages = [featuredImage, ...(images ?? [])];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = allImages[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image
          src={getStrapiImageUrl(selectedImage)}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={`${image.id}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative size-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                selectedIndex === index
                  ? 'border-primary'
                  : 'border-transparent hover:border-muted-foreground/50'
              )}
            >
              <Image
                src={getStrapiImageUrl(image)}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
