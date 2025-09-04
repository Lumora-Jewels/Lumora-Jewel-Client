import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Grid3X3, List } from "lucide-react";
import type { Category } from "../types/Category";
import { categoryService } from "../services/productService";

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleHomeClick = (): void => {
    navigate('/');
  };

  const handleCategoryClick = (categoryId: string): void => {
    navigate(`/items/${categoryId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy/60 font-josefin">Loading shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 font-josefin">
      <div className="bg-white/80 backdrop-blur-sm border-b border-gold/10">
        <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-navy hover:text-gold transition-colors duration-300 mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <nav className="flex items-center gap-2 text-sm mb-6">
            <button
              onClick={handleHomeClick}
              className="flex items-center gap-1 text-navy/60 hover:text-gold transition-colors duration-300"
            >
              <Home size={16} />
              <span>Home</span>
            </button>
            <span className="text-gold font-medium">Shop</span>
          </nav>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-navy font-josefin mb-2">
                Shop All Collections
              </h1>
              <p className="text-navy/70 text-lg font-light">
                Discover our exquisite collection of jewelry and accessories
              </p>
            </div>
            
            <div className="flex border border-gold/20 rounded-full overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "grid" 
                    ? 'bg-gold text-white' 
                    : 'bg-white/80 text-navy hover:bg-gold hover:text-white'
                }`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "list" 
                    ? 'bg-gold text-white' 
                    : 'bg-white/80 text-navy hover:bg-gold hover:text-white'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border border-gold/10"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(category._id);
                  }
                }}
              >
                <div className="h-56 w-full bg-gradient-to-br from-gold/10 via-white to-gold/5 relative overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={`${category.name} category`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl">💎</span>
                        </div>
                        <p className="text-navy/60 text-sm font-light">
                          {category.name}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-navy mb-2 group-hover:text-gold transition-colors duration-300 font-josefin">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-sm text-navy/70 mb-3 line-clamp-2 font-light">
                      {category.description}
                    </p>
                  )}
                  
                  <button 
                    className="w-full py-2 bg-gradient-to-r from-gold to-orange text-white rounded-lg font-medium hover:from-orange hover:to-gold hover:shadow-lg transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category._id);
                    }}
                  >
                    Explore Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-navy/40 mb-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💎</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-navy/60 mb-2">No categories available</h3>
            <p className="text-navy/50 mb-4">
              Please check back later for our latest collections
            </p>
            <button
              onClick={handleHomeClick}
              className="px-6 py-2 bg-gold text-white rounded-lg hover:bg-orange transition-all duration-300"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
