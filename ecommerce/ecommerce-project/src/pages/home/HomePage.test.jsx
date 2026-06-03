import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { it, expect, describe, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios');

describe('HomePage component', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('adds to cart from multiple product containers correctly', async () => {
    const mockProducts = [
      {
        id: 'p1',
        image: 'test1.jpg',
        name: 'Product 1',
        rating: { stars: 4, count: 10 },
        priceCents: 1000
      },
      {
        id: 'p2',
        image: 'test2.jpg',
        name: 'Product 2',
        rating: { stars: 5, count: 20 },
        priceCents: 2000
      }
    ];

    axios.get.mockResolvedValue({ data: mockProducts });
    axios.post.mockResolvedValue({});

    const mockLoadCart = vi.fn();

    render(
      <MemoryRouter>
        <HomePage cart={[]} LoadCart={mockLoadCart} />
      </MemoryRouter>
    );

    const productContainers = await screen.findAllByTestId('product-container');
    
    // First product
    const quantitySelector1 = within(productContainers[0]).getByTestId('quantity-selector');
    await user.selectOptions(quantitySelector1, '2');
    const button1 = within(productContainers[0]).getByTestId('add-to-cart-button');
    await user.click(button1);

    // Second product
    const quantitySelector2 = within(productContainers[1]).getByTestId('quantity-selector');
    await user.selectOptions(quantitySelector2, '3');
    const button2 = within(productContainers[1]).getByTestId('add-to-cart-button');
    await user.click(button2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
      productId: 'p1',
      quantity: 2,
    });

    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: 'p2',
      quantity: 3,
    });

    expect(mockLoadCart).toHaveBeenCalledTimes(2);
  });
});
