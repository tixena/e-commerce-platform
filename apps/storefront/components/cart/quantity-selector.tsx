'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LIMITS } from '@/lib/constants';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  min = LIMITS.QUANTITY_MIN,
  max = LIMITS.QUANTITY_MAX,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={onDecrement}
        disabled={quantity <= min}
      >
        <Minus className="size-4" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={onIncrement}
        disabled={quantity >= max}
      >
        <Plus className="size-4" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
