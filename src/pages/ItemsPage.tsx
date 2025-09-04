import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import type { Category } from "../types/Category";
import ItemsSection from "../sections/itemspagesections/ItemsSection";
import { categoryService } from "../services/productService";


const ItemsPage: React.FC = () => {
  const { id: categoryId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCategory = async () => {
      if (categoryId) {
        try {
          setLoading(true);
          const categories = await categoryService.getCategories();
          // Filter out categories without _id (old categories)
          const validCategories = categories.filter(cat => cat._id);
          const currentCategory = validCategories.find(cat => cat._id === categoryId);
          setCategory(currentCategory || null);

          if (currentCategory?.parentCategoryId) {
            const parent = validCategories.find(cat => cat._id === currentCategory.parentCategoryId);
            setParentCategory(parent || null);
          } else {
            setParentCategory(null);
          }
        } catch (error) {
          console.error('Failed to load category:', error);
          setCategory(null);
          setParentCategory(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadCategory();
  }, [categoryId]);

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleHomeClick = (): void => {
    navigate('/');
  };

  const handleParentCategoryClick = (): void => {
    if (parentCategory) {
      navigate(`/items/${parentCategory._id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-navy/60 font-josefin">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (!category || !categoryId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-gold/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy mb-4 font-josefin">Category Not Found</h1>
          <p className="text-navy/60 mb-6">The requested category could not be found.</p>
          <button
            onClick={handleHomeClick}
            className="bg-gold text-white px-6 py-3 rounded-lg hover:bg-orange transition-all duration-300"
          >
            Return Home
          </button>
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
            
            <ChevronRight size={16} className="text-navy/40" />
            
            {parentCategory && (
              <>
                <button
                  onClick={handleParentCategoryClick}
                  className="text-navy/60 hover:text-gold transition-colors duration-300"
                >
                  {parentCategory.name}
                </button>
                <ChevronRight size={16} className="text-navy/40" />
              </>
            )}
            
            <span className="text-gold font-medium">{category.name}</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {category.image && (
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-navy font-josefin">
                  {category.name}
                </h1>
                {category.parentCategoryId && (
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-semibold">
                    Subcategory
                  </span>
                )}
              </div>
              
              {category.description && (
                <p className="text-navy/70 text-lg mb-4 font-light leading-relaxed">
                  {category.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-navy/60">
                <span>Updated {new Date(category.updatedAt).toLocaleDateString()}</span>
                {parentCategory && (
                  <span>Part of {parentCategory.name}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ItemsSection categoryId={categoryId} />
    </div>
  );
};

export default ItemsPage;