import React, { useState } from "react";
import { Heart, ShoppingCart, Eye, Star, Sparkles } from "lucide-react";
import type { ProductCardProps } from "../../types/Products";
import AddToCartButton from "../cart/AddToCartButton";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = (): { text: string; color: string } => {
    if (product.stock === 0) return { text: "Out of Stock", color: "text-red-500" };
    if (product.stock <= 5) return { text: "Low Stock", color: "text-orange-500" };
    return { text: "In Stock", color: "text-green-500" };
  };

  const getUniqueColors = ()=> {
    return [...new Set(product.variants.map(v => v.color).filter(Boolean))];
  };

  const getUniqueSizes = ()=> {
    return [...new Set(product.variants.map(v => v.size).filter(Boolean))];
  };

  const handleImageChange = (index: number): void => {
    setCurrentImageIndex(index);
    setImageLoaded(false);
  };

  const handleWishlistToggle = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation();
    console.log('Add to cart:', product.name);
  };

  const handleQuickView = (e: React.MouseEvent): void => {
    e.stopPropagation();
    console.log('Quick view:', product.name);
  };

  const handleProductClick = (): void => {
    console.log('Navigate to product:', product._id);
  };

  const stockStatus = getStockStatus();
  const colors = getUniqueColors();
  const sizes = getUniqueSizes();
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gold/10 cursor-pointer relative"
      onClick={handleProductClick}
    >
      <div className="relative h-64 overflow-hidden">
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            -{product.discount}%
          </div>
        )}

        <div className={`absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color} shadow-lg`}>
          {stockStatus.text}
        </div>

        {product.images.length > 0 ? (
          <>
            {!imageError ? (
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gold/20 via-light to-orange/10 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles size={32} className="text-gold mx-auto mb-2" />
                  <p className="text-navy/60 text-sm font-light">{product.name}</p>
                </div>
              </div>
            )}

            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-light to-orange/10 animate-pulse" />
            )}

            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageChange(index);
                    }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold/20 via-light to-orange/10 flex items-center justify-center">
            <div className="text-center">
              <Sparkles size={32} className="text-gold mx-auto mb-2" />
              <p className="text-navy/60 text-sm font-light">No Image</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            className="bg-white text-navy p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            onClick={handleQuickView}
            aria-label="Quick view"
          >
            <Eye size={20} />
          </button>
          <button
            className="bg-white text-navy p-3 rounded-full shadow-lg hover:bg-gold hover:text-white transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 delay-75"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            disabled={product.stock === 0}
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        <button
          className={`absolute top-3 right-12 p-2 rounded-full transition-all duration-300 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-navy hover:bg-red-500 hover:text-white'
          }`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
        </button>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      </div>

      <div className="p-4">
        
        <h3 className="font-semibold text-lg text-navy mb-2 group-hover:text-gold transition-colors duration-300 font-josefin line-clamp-1">
          {product.name}
        </h3>

        {product.SKU && (
          <p className="text-xs text-navy/50 mb-2">SKU: {product.SKU}</p>
        )}

        {product.description && (
          <p className="text-sm text-navy/70 mb-3 line-clamp-2 font-light">
            {product.description}
          </p>
        )}

        {(colors.length > 0 || sizes.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {colors.slice(0, 3).map((color, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gold/10 text-gold text-xs rounded-full font-medium"
              >
                {color}
              </span>
            ))}
            {sizes.slice(0, 2).map((size, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-navy/10 text-navy text-xs rounded-full font-medium"
              >
                {size}
              </span>
            ))}
            {(colors.length + sizes.length) > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{(colors.length + sizes.length) - 5} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-navy">
              {formatPrice(discountedPrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Star size={14} className="fill-gold text-gold" />
            <span className="text-sm text-navy/60">4.8</span>
          </div>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;