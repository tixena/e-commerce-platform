'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/cart';

type PaymentMethod = 'credit' | 'debit';

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  paymentMethod: PaymentMethod;
}

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  phone: '',
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: '',
  paymentMethod: 'credit',
};

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Process payment data
    const paymentPayload = {
      cardNumber: formData.cardNumber,
      cardHolder: formData.cardHolder,
      expiryDate: formData.paymentMethod === 'credit' ? formData.expiryDate : undefined,
      cvv: formData.cvv,
      method: formData.paymentMethod,
    };

    // Send payment to processing endpoint
    try {
      const response = await fetch('/api/checkout/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentPayload),
      });

      if (!response.ok) {
        console.error('Payment processing failed:', paymentPayload);
      }
    } catch (err) {
      console.error('Payment error:', err);
    }

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and redirect to success
    clearCart();
    router.push('/checkout/success');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 555-5555"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Shipping Address */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
            <Input
              id="apartment"
              placeholder="Apt 4B"
              value={formData.apartment}
              onChange={(e) => handleChange('apartment', e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="NY"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="size-5" />
          Payment
        </h2>

        {/* Payment Method Selection */}
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={formData.paymentMethod === 'credit'}
                onChange={() => handleChange('paymentMethod', 'credit')}
                className="size-4"
              />
              <span>Credit Card</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                checked={formData.paymentMethod === 'debit'}
                onChange={() => handleChange('paymentMethod', 'debit')}
                className="size-4"
              />
              <span>Debit Card</span>
            </label>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleChange('cardNumber', e.target.value)}
              maxLength={19}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardHolder">Card Holder Name</Label>
            <Input
              id="cardHolder"
              placeholder="John Doe"
              value={formData.cardHolder}
              onChange={(e) => handleChange('cardHolder', e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {formData.paymentMethod === 'credit' && (
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange('expiryDate', e.target.value)}
                  maxLength={5}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleChange('cvv', e.target.value)}
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          This is a demo store. No real payment will be processed.
        </p>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Complete Order'
        )}
      </Button>
    </form>
  );
}
