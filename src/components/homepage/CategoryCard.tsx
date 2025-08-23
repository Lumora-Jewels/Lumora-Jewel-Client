import React, { useState } from "react";
import { ArrowRight, Clock, Tag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CategoryCardProps } from "../../types/Category";

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getGradient = (name: string): string => {
    if (name.includes("Diamond") || name.includes("Ring")) return "from-blue-100 via-purple-50 to-pink-100";
    if (name.includes("Gold")) return "from-yellow-100 via-orange-50 to-yellow-100";
    if (name.includes("Watch")) return "from-slate-100 via-blue-50 to-indigo-100";
    if (name.includes("Pearl")) return "from-gray-50 via-white to-purple-50";
    if (name.includes("Wedding")) return "from-pink-100 via-rose-50 to-red-100";
    if (name.includes("Tennis")) return "from-emerald-100 via-green-50 to-teal-100";
    if (name.includes("Vintage")) return "from-amber-100 via-yellow-50 to-orange-100";
    return "from-gray-100 via-white to-gray-200";
  };

  const getIcon =()=> {
    if (category.name.toLowerCase().includes("watch")) {
      return <Clock size={24} className="text-gold" />;
    }
    if (category.name.toLowerCase().includes("ring") || category.name.toLowerCase().includes("diamond")) {
      return <Sparkles size={24} className="text-gold" />;
    }
    return <Tag size={24} className="text-gold" />;
  };

  const handleCardClick = (): void => {
    navigate(`/items/${category._id}`);
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    navigate(`/items/${category._id}`);
  };

  const handleImageLoad = (): void => {
    setImageLoaded(true);
  };

  const handleImageError = (): void => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden border border-gold/10"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      <div className={`h-56 w-full bg-gradient-to-br ${getGradient(category.name)} relative overflow-hidden`}>
        {!imageError && category.image ? (
          <img
            src={category.image}
            alt={`${category.name} category`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {getIcon()}
              <p className="text-navy/60 text-sm mt-2 font-light">
                {category.name}
              </p>
            </div>
          </div>
        )}

        {!imageLoaded && !imageError && category.image && (
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(category.name)} animate-pulse`} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold shadow-lg">
          {getIcon()} 
          <span>{category.parentCategoryId ? "Subcategory" : "Main"}</span>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button 
            className="bg-gold text-white p-2 rounded-full shadow-lg hover:bg-orange hover:scale-110 transition-all duration-300"
            onClick={handleExploreClick}
            aria-label={`Explore ${category.name} collection`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
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
          onClick={handleExploreClick}
        >
          Explore Collection
        </button>
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-gold/10 to-transparent rounded-tl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default CategoryCard;