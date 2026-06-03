import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { Product } from './Product';

describe('Product component', () => {
  it('displays the correct initial quantity in the quantity selector', () => {
    const mockProduct = {
      id: '123',
      image: 'test.jpg',
      name: 'Test Product',
      rating: { stars: 4.5, count: 100 },
      priceCents: 1090
    };
    const mockLoadCart = () => {};

    render(<Product product={mockProduct} LoadCart={mockLoadCart} />);
    
    const quantitySelector = screen.getByTestId('quantity-selector');
    expect(quantitySelector).toHaveValue('1');
  });
});
