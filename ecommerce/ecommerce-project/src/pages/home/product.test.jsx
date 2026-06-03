import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, describe, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');

describe('Product component', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const mockProduct = {
    id: '123',
    image: 'test.jpg',
    name: 'Test Product',
    rating: { stars: 4.5, count: 100 },
    priceCents: 1090
  };

  it('displays the correct initial quantity in the quantity selector', () => {
    const mockLoadCart = () => {};

    render(<Product product={mockProduct} LoadCart={mockLoadCart} />);
    
    const quantitySelector = screen.getByTestId('quantity-selector');
    expect(quantitySelector).toHaveValue('1');
  });

  it('updates quantity and adds to cart', async () => {
    const mockLoadCart = vi.fn();

    render(<Product product={mockProduct} LoadCart={mockLoadCart} />);
    
    const quantitySelector = screen.getByTestId('quantity-selector');
    await user.selectOptions(quantitySelector, '3');
    
    expect(quantitySelector).toHaveValue('3');

    const addToCartButton = screen.getByRole('button', { name: /Add to Cart/i });
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith('/api/cart-items', {
      productId: '123',
      quantity: 3,
    });
    expect(mockLoadCart).toHaveBeenCalled();
  });
});
