'use client';

import { cn } from '@/lib/utils';
import type { ProductOption, ProductVariant, SelectedOption } from '@/types';

interface VariantSelectorProps {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, value: string) => void;
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  const isOptionAvailable = (optionName: string, value: string): boolean => {
    const testOptions = { ...selectedOptions, [optionName]: value };

    return variants.some((variant) => {
      const variantOptions = variant.selectedOptions.reduce<Record<string, string>>(
        (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
        {}
      );

      return (
        variant.availableForSale &&
        Object.entries(testOptions).every(
          ([name, val]) => variantOptions[name] === val
        )
      );
    });
  };

  if (options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      {options.map((option) => (
        <div key={option.id} className="flex flex-col gap-2">
          <label className="text-sm font-medium">{option.name}</label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = isOptionAvailable(option.name, value);

              return (
                <button
                  key={value}
                  onClick={() => onOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={cn(
                    'rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-background hover:bg-muted',
                    !isAvailable && 'cursor-not-allowed opacity-50 line-through'
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function findVariantByOptions(
  variants: ProductVariant[],
  selectedOptions: Record<string, string>
): ProductVariant | null {
  return (
    variants.find((variant) => {
      const variantOptions = variant.selectedOptions.reduce<Record<string, string>>(
        (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
        {}
      );

      return Object.entries(selectedOptions).every(
        ([name, value]) => variantOptions[name] === value
      );
    }) ?? null
  );
}

export function getDefaultOptions(
  options: ProductOption[],
  variants: ProductVariant[]
): Record<string, string> {
  const availableVariant = variants.find((v) => v.availableForSale) ?? variants[0];

  if (!availableVariant) {
    return options.reduce<Record<string, string>>(
      (acc, opt) => ({ ...acc, [opt.name]: opt.values[0] ?? '' }),
      {}
    );
  }

  return availableVariant.selectedOptions.reduce<Record<string, string>>(
    (acc, opt) => ({ ...acc, [opt.name]: opt.value }),
    {}
  );
}
