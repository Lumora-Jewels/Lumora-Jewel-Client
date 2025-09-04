import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import type { Product } from '../../types/Products';
import type { AddToCartRequest } from '../../types/Cart';
import AuthModal from '../auth/AuthModal';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, className = "" }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<{
    color?: string;
    size?: string;
    material?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState<string>("");

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (product.stock === 0) {
      setError("This product is out of stock");
      return;
    }

    if (quantity > product.stock) {
      setError(`Only ${product.stock} items available in stock`);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const cartItem: AddToCartRequest = {
        productId: product._id,
        quantity,
        selectedVariant: Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined,
        price: product.price,
      };

      await addToCart(cartItem);
      
      // Reset form
      setQuantity(1);
      setSelectedVariant({});
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (type: 'color' | 'size' | 'material', value: string) => {
    setSelectedVariant(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Variant Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-3">
          {/* Color Selection */}
          {product.variants.some(v => v.color) && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(product.variants.map(v => v.color).filter(Boolean))).map(color => (
                  <button
                    key={color}
                    onClick={() => handleVariantChange('color', color!)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                      selectedVariant.color === color
                        ? 'bg-gold text-white border-gold'
                        : 'bg-white text-navy border-gold/20 hover:border-gold'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.variants.some(v => v.size) && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(product.variants.map(v => v.size).filter(Boolean))).map(size => (
                  <button
                    key={size}
                    onClick={() => handleVariantChange('size', size!)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                      selectedVariant.size === size
                        ? 'bg-gold text-white border-gold'
                        : 'bg-white text-navy border-gold/20 hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Material Selection */}
          {product.variants.some(v => v.material) && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Material</label>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(product.variants.map(v => v.material).filter(Boolean))).map(material => (
                  <button
                    key={material}
                    onClick={() => handleVariantChange('material', material!)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                      selectedVariant.material === material
                        ? 'bg-gold text-white border-gold'
                        : 'bg-white text-navy border-gold/20 hover:border-gold'
                    }`}
                  >
                    {material}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quantity Selection */}
      <div>
        <label className="block text-sm font-semibold text-navy mb-2">Quantity</label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="p-2 border border-gold/20 rounded-lg hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-navy hover:border-gold"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 border border-gold/20 rounded-lg bg-white min-w-[60px] text-center text-navy font-medium shadow-sm">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
            className="p-2 border border-gold/20 rounded-lg hover:bg-gold/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-navy hover:border-gold"
          >
            <Plus size={16} />
          </button>
        </div>
        <p className="text-sm text-navy/60 mt-1">
          {product.stock} available in stock
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isLoading || product.stock === 0}
        className="w-full bg-gold text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Adding...</span>
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </>
        )}
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
};

export default AddToCartButton;
