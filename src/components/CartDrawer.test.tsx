import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartDrawer from "./CartDrawer";
import type { CartItem } from "../types";

const mockCartItem: CartItem = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: { rate: 4.5, count: 10 },
  quantity: 2,
};

describe("CartDrawer", () => {
  const mockOnClose = vi.fn();
  const mockOnUpdateQuantity = vi.fn();
  const mockOnRemove = vi.fn();

  const defaultProps = {
    open: true,
    cartItems: [mockCartItem],
    onClose: mockOnClose,
    onUpdateQuantity: mockOnUpdateQuantity,
    onRemove: mockOnRemove,
  };

  it("should render cart drawer when open", () => {
    render(<CartDrawer {...defaultProps} />);

    const cartTitle = screen.getByText("Your bag");
    expect(cartTitle).toBeInTheDocument();
  });

  it("should set aria-hidden when closed", () => {
    const { container } = render(<CartDrawer {...defaultProps} open={false} />);

    // When closed, the drawer container should have aria-hidden
    const drawerContainer = container.querySelector('div[aria-hidden="true"]');
    expect(drawerContainer).toBeInTheDocument();
    expect(drawerContainer).toHaveClass("translate-x-full");
  });

  it("should display empty cart message when no items", () => {
    render(<CartDrawer {...defaultProps} cartItems={[]} />);

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  it("should display cart items with correct details", () => {
    render(<CartDrawer {...defaultProps} />);

    expect(screen.getByText(mockCartItem.title)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockCartItem.price.toFixed(2)}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockCartItem.quantity.toString()),
    ).toBeInTheDocument();
  });

  it("should calculate and display correct total", () => {
    const expectedTotal = mockCartItem.price * mockCartItem.quantity;
    render(<CartDrawer {...defaultProps} />);

    expect(
      screen.getByText(`$${expectedTotal.toFixed(2)}`),
    ).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onUpdateQuantity when increase button is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const increaseButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(increaseButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(
      mockCartItem.id,
      mockCartItem.quantity + 1,
    );
  });

  it("should call onUpdateQuantity when decrease button is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const decreaseButton = screen.getByLabelText("Decrease quantity");
    fireEvent.click(decreaseButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(
      mockCartItem.id,
      mockCartItem.quantity - 1,
    );
  });

  it("should call onRemove when remove button is clicked", () => {
    render(<CartDrawer {...defaultProps} />);

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(mockCartItem.id);
  });

  it("should disable checkout button when cart is empty", () => {
    render(<CartDrawer {...defaultProps} cartItems={[]} />);

    const checkoutButton = screen.getByText("Checkout");
    expect(checkoutButton).toBeDisabled();
  });

  it("should enable checkout button when cart has items", () => {
    render(<CartDrawer {...defaultProps} />);

    const checkoutButton = screen.getByText("Checkout");
    expect(checkoutButton).not.toBeDisabled();
  });
});
