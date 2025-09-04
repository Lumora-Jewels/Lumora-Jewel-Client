import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import type { Category, CategorySectionProps, FilterType } from "../../types/Category";
import CategoryCard from "../../components/homepage/CategoryCard";
import { categoryService } from "../../services/productService";

const sampleCategories: Category[] = [
  { _id: "1", name: "Diamond Rings", parentCategoryId: null, description: "Exquisite diamond rings", image: "/api/placeholder/300/300", createdAt: new Date(), updatedAt: new Date() },
  { _id: "2", name: "Luxury Watches", parentCategoryId: null, description: "Premium timepieces", image: "/api/placeholder/300/300", createdAt: new Date(), updatedAt: new Date() },
  { _id: "3", name: "Gold Necklaces", parentCategoryId: null, description: "Elegant gold necklaces", image: "/api/placeholder/300/300", createdAt: new Date(), updatedAt: new Date() },
  { _id: "4", name: "Pearl Earrings", parentCategoryId: null, description: "Classic pearl earrings", image: "/api/placeholder/300/300", createdAt: new Date(), updatedAt: new Date() },
  { _id: "5", name: "Wedding Bands", parentCategoryId: "1", description: "Symbol of eternal love", image: "/api/placeholder/300/300", createdAt: new Date(), updatedAt: new Date() },
  { _id: "6", name: "Sports Watches", parentCategoryId: "2", description: "Durable and stylish watches", image: "/api/placeholder/300/300", createdAt: new Date(), updatedAt: new Date() }
];

const CategorySection: React.FC<CategorySectionProps> = ({ className = "" }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Load categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setError("");
        const categoriesData = await categoryService.getCategories();
        // Filter out categories without _id (old categories)
        const validCategories = categoriesData.filter(cat => cat._id);
        setCategories(validCategories);
        setFilteredCategories(validCategories);
      } catch (err: any) {
        console.error('Failed to load categories:', err);
        setError("Failed to load categories. Please try again later.");
        // Fallback to sample data
        setCategories(sampleCategories);
        setFilteredCategories(sampleCategories);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Filter categories based on search and filter criteria
  useEffect(() => {
    let filtered = categories;

    if (searchTerm.trim()) {
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter(cat =>
        selectedFilter === "parent" ? cat.parentCategoryId === null : cat.parentCategoryId !== null
      );
    }

    setFilteredCategories(filtered);
  }, [searchTerm, selectedFilter, categories]);

  return (
    <section className={`w-full py-16 font-josefin ${className}`}>
      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-4">
            Explore Our
            <span className="block text-gold font-italianno text-5xl lg:text-6xl">
              Collections
            </span>
          </h2>
          <p className="text-navy/70 text-lg max-w-2xl mx-auto font-light">
            Discover our curated selection of premium jewelry and luxury timepieces.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gold/20 rounded-full bg-white/80 backdrop-blur-sm text-navy placeholder-navy/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy/40 pointer-events-none" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as FilterType)}
              className="pl-10 pr-8 py-3 border border-gold/20 rounded-full bg-white/80 backdrop-blur-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 cursor-pointer appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="parent">Main Categories</option>
              <option value="subcategory">Subcategories</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
            <p className="text-navy/50 mt-4">Loading categories...</p>
          </div>
        ) : filteredCategories.length > 0 ? (
            <div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={10}
                    breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 4 },
                    }}
                    pagination={{ 
                        clickable: true, 
                        el: '.testimonial-pagination',
                        bulletClass: 'swiper-pagination-bullet testimonial-bullet',
                        bulletActiveClass: 'testimonial-bullet-active'
                        }}
                        autoplay={{ 
                        delay: 4000, 
                        disableOnInteraction: false 
                        }}
                        loop
                        className="testimonial-swiper"
                >
                    {filteredCategories.map((cat) => (
                    <SwiperSlide className="p-4" key={cat._id}>
                        <CategoryCard category={cat} />
                    </SwiperSlide>
                    ))}
                </Swiper>
                <div className="testimonial-pagination mt-4 flex justify-center"></div>
                <style>{`
                    .testimonial-bullet {
                    background: rgba(255, 255, 255, 0);
                    opacity: 1;
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                    }
                    .testimonial-bullet-active {
                    background: #14b8a6;
                    }
                `}</style>
            </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-navy/50">No categories found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
