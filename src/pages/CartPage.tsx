import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, isLoading, updateCartItem, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-4">Please log in to view your cart</h2>
          <Link
            to="/"
            className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-navy/50">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-4">Your cart is empty</h2>
          <p className="text-navy/60 mb-6">Add some items to get started</p>
          <Link
            to="/"
            className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCartItem(itemId, { quantity: newQuantity });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 py-8">
      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-navy hover:text-gold transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-navy">Shopping Cart</h1>
                <button
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  <span>Clear Cart</span>
                </button>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-4 border border-gold/20 rounded-lg hover:bg-gold/5 transition-all duration-200"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-orange/20 rounded-lg flex items-center justify-center">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <ShoppingCart size={24} className="text-gold" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy mb-1">{item.product.name}</h3>
                      {item.selectedVariant && (
                        <div className="flex gap-2 mb-2">
                          {item.selectedVariant.color && (
                            <span className="px-2 py-1 bg-gold/10 text-gold text-xs rounded-full">
                              {item.selectedVariant.color}
                            </span>
                          )}
                          {item.selectedVariant.size && (
                            <span className="px-2 py-1 bg-navy/10 text-navy text-xs rounded-full">
                              {item.selectedVariant.size}
                            </span>
                          )}
                          {item.selectedVariant.material && (
                            <span className="px-2 py-1 bg-orange/10 text-orange text-xs rounded-full">
                              {item.selectedVariant.material}
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-navy/60">SKU: {item.product.SKU}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 border border-gold/20 rounded hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 border border-gold/20 rounded bg-white min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-1 border border-gold/20 rounded hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-navy">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-sm text-navy/60">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-navy mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-navy/70">Subtotal</span>
                  <span className="font-semibold text-navy">{formatPrice(cart.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/70">Shipping</span>
                  <span className="font-semibold text-navy">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/70">Tax</span>
                  <span className="font-semibold text-navy">$0.00</span>
                </div>
                <div className="border-t border-gold/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-navy">Total</span>
                    <span className="text-lg font-bold text-gold">{formatPrice(cart.totalPrice)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-gold text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange transition-all duration-300 mb-4 text-center"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-navy/50 text-center">
                Secure checkout powered by our payment system
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
