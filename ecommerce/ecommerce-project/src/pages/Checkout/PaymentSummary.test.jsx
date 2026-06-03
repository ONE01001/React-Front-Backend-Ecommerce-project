import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router';
import { it, expect, describe, vi } from 'vitest';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

function Location() {
  const location = useLocation();
  return <div data-testid="url-path">{location.pathname}</div>;
}

describe('PaymentSummary component', () => {
  it('displays correct dollar amounts and creates order', async () => {
    const mockLoadCart = vi.fn();
    
    const mockPaymentSummary = {
      totalItems: 3,
      productCostCents: 3000,
      shippingCostCents: 500,
      totalCostBeforeTaxCents: 3500,
      taxCents: 350,
      totalCostCents: 3850
    };

    axios.post.mockResolvedValue({});

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={mockPaymentSummary} LoadCart={mockLoadCart} />
        <Location />
      </MemoryRouter>
    );

    const itemsRow = screen.getByTestId('payment-summary-items');
    expect(itemsRow).toHaveTextContent('Items (3):');
    expect(itemsRow).toHaveTextContent('$30.00');

    const shippingRow = screen.getByTestId('payment-summary-shipping');
    expect(shippingRow).toHaveTextContent('Shipping & handling:');
    expect(shippingRow).toHaveTextContent('$5.00');

    const subtotalRow = screen.getByTestId('payment-summary-subtotal');
    expect(subtotalRow).toHaveTextContent('Total before tax:');
    expect(subtotalRow).toHaveTextContent('$35.00');

    const taxRow = screen.getByTestId('payment-summary-tax');
    expect(taxRow).toHaveTextContent('Estimated tax (10%):');
    expect(taxRow).toHaveTextContent('$3.50');

    const totalRow = screen.getByTestId('payment-summary-total');
    expect(totalRow).toHaveTextContent('Order total:');
    expect(totalRow).toHaveTextContent('$38.50');

    const user = userEvent.setup();
    const placeOrderButton = screen.getByRole('button', { name: /Place your order/i });
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(mockLoadCart).toHaveBeenCalled();

    const urlPath = screen.getByTestId('url-path');
    expect(urlPath).toHaveTextContent('/orders');
  });
});
