import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import type { ShippingAddress } from '../types/Order';
import { ArrowLeft, CreditCard, Lock, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'debit_card' | 'paypal' | 'cash_on_delivery'>('credit_card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateSubtotal = (): number => {
    if (!cart) return 0;
    return cart.items.reduce((sum, item) => sum + (item.priceSnapshot * item.quantity), 0);
  };

  const calculateTax = (): number => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cart || !user) return;

    setIsLoading(true);
    setError("");

    try {
      // Create order
      const orderData = {
        userId: user._id,
        items: cart.items.map(item => ({
          productId: typeof item.productId === 'object' ? item.productId._id : item.productId,
          quantity: item.quantity,
          priceSnapshot: item.priceSnapshot,
          variant: item.variant,
        })),
        totalAmount: calculateTotal(),
        shippingAddress: {
          label: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          street: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
        paymentMethod,
      };

      const order = await orderService.createOrder(orderData as any);
      setOrderId(order._id);

      // Create payment record
      const paymentData = {
        orderId: order._id,
        amount: calculateTotal(),
        paymentMethod: paymentMethod,
        paymentDetails: paymentMethod === 'cash_on_delivery' || paymentMethod === 'paypal' ? {} : {
          cardNumber: paymentDetails.cardNumber,
          expiryDate: paymentDetails.expiryDate,
          cvv: paymentDetails.cvv,
          cardholderName: paymentDetails.cardholderName,
          billingAddress: {
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            address: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            zipCode: shippingAddress.zipCode,
            country: shippingAddress.country,
          }
        }
      } as const;

      await paymentService.createPayment(paymentData as any);

      // Clear cart
      await clearCart();

      setOrderSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to process order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">
              {paymentMethod === 'cash_on_delivery' ? 'Order Placed Successfully!' : 'Order Successful!'}
            </h2>
            <p className="text-navy/70 mb-4">
              Thank you for your purchase. Your order #{orderId} has been confirmed.
            </p>
            {paymentMethod === 'cash_on_delivery' ? (
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Banknote size={20} className="text-gold mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-navy mb-1">Cash on Delivery</p>
                    <p className="text-sm text-navy/70 mb-2">
                      Please have the exact amount ready: <span className="font-semibold text-gold">{formatPrice(calculateTotal())}</span>
                    </p>
                    <p className="text-sm text-navy/70">
                      Our delivery person will collect payment when your order arrives.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-navy/60 mb-6">
                You will receive an email confirmation shortly.
              </p>
            )}
            <Link
              to="/"
              className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Your cart is empty</h2>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 py-8">
      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/cart"
            className="flex items-center gap-2 text-navy hover:text-gold transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Shipping Address */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-navy mb-6">Shipping Address</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingAddress.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingAddress.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-navy mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Country</label>
                  <select
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-navy mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 p-4 border border-gold/20 rounded-lg cursor-pointer hover:bg-gold/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="text-gold"
                  />
                  <CreditCard size={20} className="text-navy" />
                  <span className="text-navy font-medium">Credit Card</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gold/20 rounded-lg cursor-pointer hover:bg-gold/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit_card"
                    checked={paymentMethod === 'debit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="text-gold"
                  />
                  <CreditCard size={20} className="text-navy" />
                  <span className="text-navy font-medium">Debit Card</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gold/20 rounded-lg cursor-pointer hover:bg-gold/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="text-gold"
                  />
                  <div className="w-5 h-5 bg-blue-600 rounded"></div>
                  <span className="text-navy font-medium">PayPal</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gold/20 rounded-lg cursor-pointer hover:bg-gold/5 transition-all duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="text-gold"
                  />
                  <Banknote size={20} className="text-navy" />
                  <span className="text-navy font-medium">Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod !== 'paypal' && paymentMethod !== 'cash_on_delivery' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handlePaymentInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handlePaymentInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentDetails.cardholderName}
                      onChange={handlePaymentInputChange}
                      required
                      className="w-full px-4 py-3 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'cash_on_delivery' && (
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Banknote size={20} className="text-gold mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-navy mb-2">Cash on Delivery</h3>
                      <p className="text-sm text-navy/70 mb-2">
                        Pay with cash when your order is delivered to your doorstep.
                      </p>
                      <p className="text-sm text-navy/70">
                        Please have the exact amount ready: <span className="font-semibold text-gold">{formatPrice(calculateTotal())}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-navy mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-orange/20 rounded-lg flex items-center justify-center">
                      {(typeof item.productId === 'object' ? item.productId.images : null) && (typeof item.productId === 'object' ? item.productId.images.length > 0 : false) ? (
                        <img
                          src={(typeof item.productId === 'object' ? item.productId.images[0] : '')}
                          alt={(typeof item.productId === 'object' ? item.productId.name : null) || 'Product'}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gold text-xs">IMG</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-navy text-sm">{(typeof item.productId === 'object' ? item.productId.name : null) || `Product ${item.productId}`}</h4>
                      <p className="text-xs text-navy/60">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-navy">
                      {formatPrice(item.priceSnapshot * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gold/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-navy/70">Subtotal</span>
                  <span className="font-semibold text-navy">{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/70">Shipping</span>
                  <span className="font-semibold text-navy">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/70">Tax</span>
                  <span className="font-semibold text-navy">{formatPrice(calculateTax())}</span>
                </div>
                <div className="border-t border-gold/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-navy">Total</span>
                    <span className="text-lg font-bold text-gold">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>Complete Order</span>
                  </>
                )}
              </button>

              <p className="text-xs text-navy/50 text-center mt-4">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
