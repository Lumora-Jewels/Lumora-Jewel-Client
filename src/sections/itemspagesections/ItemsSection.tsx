import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Grid3X3, List, ArrowUpDown } from "lucide-react";
import type { ItemsSectionProps, Product, ProductFilters, ProductSearchState, ProductSortType } from "../../types/Products";
import ProductCard from "../../components/itemspage/ProductCard";


const sampleProducts: Product[] = [
  {
    _id: "1",
    name: "Elegant Diamond Solitaire Ring",
    description: "Classic solitaire ring featuring a brilliant-cut diamond in 18k white gold setting",
    SKU: "DR001",
    price: 2500,
    discount: 10,
    stock: 5,
    variants: [
      { color: "White Gold", size: "6", material: "18k Gold" },
      { color: "Yellow Gold", size: "7", material: "18k Gold" }
    ],
    categoryId: "1",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/301"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    name: "Vintage Rose Gold Wedding Band",
    description: "Intricate vintage-style wedding band with milgrain detailing",
    SKU: "WB001",
    price: 850,
    discount: 0,
    stock: 12,
    variants: [
      { color: "Rose Gold", size: "5", material: "14k Gold" },
      { color: "Rose Gold", size: "6", material: "14k Gold" },
      { color: "Rose Gold", size: "7", material: "14k Gold" }
    ],
    categoryId: "1",
    images: ["/api/placeholder/300/302"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    name: "Princess Cut Engagement Ring",
    description: "Stunning princess cut diamond with halo setting",
    SKU: "ER001",
    price: 3200,
    discount: 15,
    stock: 3,
    variants: [
      { color: "Platinum", size: "6", material: "Platinum" },
      { color: "White Gold", size: "6.5", material: "18k Gold" }
    ],
    categoryId: "1",
    images: ["/api/placeholder/300/303", "/api/placeholder/300/304", "/api/placeholder/300/305"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    name: "Luxury Swiss Watch",
    description: "Premium automatic watch with sapphire crystal",
    SKU: "LW001",
    price: 4500,
    discount: 5,
    stock: 8,
    variants: [
      { color: "Silver", size: "42mm", material: "Stainless Steel" },
      { color: "Gold", size: "40mm", material: "18k Gold" }
    ],
    categoryId: "2",
    images: ["/api/placeholder/300/306"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    name: "Tennis Bracelet with Diamonds",
    description: "Classic tennis bracelet with brilliant-cut diamonds",
    SKU: "TB001",
    price: 1800,
    discount: 0,
    stock: 0,
    variants: [
      { color: "White Gold", material: "18k Gold" },
      { color: "Yellow Gold", material: "18k Gold" }
    ],
    categoryId: "7",
    images: ["/api/placeholder/300/307", "/api/placeholder/300/308"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "6",
    name: "Pearl Drop Earrings",
    description: "Elegant freshwater pearl earrings with gold accents",
    SKU: "PE001",
    price: 450,
    discount: 20,
    stock: 15,
    variants: [
      { color: "White Pearl", material: "14k Gold" },
      { color: "Black Pearl", material: "14k Gold" }
    ],
    categoryId: "4",
    images: ["/api/placeholder/300/309"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const ItemsSection: React.FC<ItemsSectionProps> = ({ categoryId, className = "" }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchState, setSearchState] = useState<ProductSearchState>({
    searchTerm: "",
    sortBy: "name",
    filters: {},
    currentPage: 1,
    itemsPerPage: 12
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    let filtered = products.filter(product => product.categoryId === categoryId);

    if (searchState.searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchState.searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchState.searchTerm.toLowerCase())) ||
        (product.SKU && product.SKU.toLowerCase().includes(searchState.searchTerm.toLowerCase()))
      );
    }

    if (searchState.filters.minPrice !== undefined) {
      filtered = filtered.filter(product => {
        const price = product.discount 
          ? product.price - (product.price * product.discount / 100)
          : product.price;
        return price >= (searchState.filters.minPrice || 0);
      });
    }

    if (searchState.filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => {
        const price = product.discount 
          ? product.price - (product.price * product.discount / 100)
          : product.price;
        return price <= (searchState.filters.maxPrice || Infinity);
      });
    }

    if (searchState.filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    filtered.sort((a, b) => {
      switch (searchState.sortBy) {
        case "price-low":
          const priceA = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const priceB = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return priceA - priceB;
        case "price-high":
          const priceA2 = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const priceB2 = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return priceB2 - priceA2;
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    setSearchState(prev => ({ ...prev, currentPage: 1 }));
  }, [products, categoryId, searchState.searchTerm, searchState.sortBy, searchState.filters]);

  const getPaginatedProducts = (): Product[] => {
    const startIndex = (searchState.currentPage - 1) * searchState.itemsPerPage;
    const endIndex = startIndex + searchState.itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / searchState.itemsPerPage);
  const paginatedProducts = getPaginatedProducts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchState(prev => ({
      ...prev,
      searchTerm: e.target.value
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSearchState(prev => ({
      ...prev,
      sortBy: e.target.value as ProductSortType
    }));
  };

  const handleFilterChange = (filters: Partial<ProductFilters>): void => {
    setSearchState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  };

  const handlePageChange = (page: number): void => {
    setSearchState(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = (): void => {
    setSearchState(prev => ({
      ...prev,
      searchTerm: "",
      filters: {},
      currentPage: 1
    }));
  };

  return (
    <div className={`w-full py-8 bg-gradient-to-br from-light via-white to-gold/5 font-josefin ${className}`}>
      <div className="max-w-boundary mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchState.searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gold/20 rounded-full bg-white/80 backdrop-blur-sm text-navy placeholder-navy/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <ArrowUpDown size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy/40 pointer-events-none" />
              <select
                value={searchState.sortBy}
                onChange={handleSortChange}
                className="pl-10 pr-8 py-3 border border-gold/20 rounded-full bg-white/80 backdrop-blur-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all duration-300 cursor-pointer appearance-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border border-gold/20 rounded-full transition-all duration-300 ${
                showFilters 
                  ? 'bg-gold text-white' 
                  : 'bg-white/80 text-navy hover:bg-gold hover:text-white'
              }`}
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
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

        {showFilters && (
          <div className="bg-white/80 backdrop-blur-sm border border-gold/20 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={searchState.filters.minPrice || ""}
                    onChange={(e) => handleFilterChange({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="flex-1 px-3 py-2 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={searchState.filters.maxPrice || ""}
                    onChange={(e) => handleFilterChange({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="flex-1 px-3 py-2 border border-gold/20 rounded-lg bg-white text-navy focus:outline-none focus:ring-2 focus:ring-gold/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Availability</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={searchState.filters.inStock || false}
                    onChange={(e) => handleFilterChange({ inStock: e.target.checked })}
                    className="w-4 h-4 text-gold border-gold/20 rounded focus:ring-gold focus:ring-2"
                  />
                  <span className="text-sm text-navy">In Stock Only</span>
                </label>
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-navy/10 text-navy rounded-lg hover:bg-navy hover:text-white transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mb-6">
          <p className="text-navy/60 font-light">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
            {searchState.searchTerm && (
              <span className="ml-2 text-gold font-medium">
                for "{searchState.searchTerm}"
              </span>
            )}
          </p>
          
          {filteredProducts.length > 0 && (
            <p className="text-sm text-navy/50">
              Page {searchState.currentPage} of {totalPages}
            </p>
          )}
        </div>
        {paginatedProducts.length > 0 ? (
          <div className={`grid gap-6 mb-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-navy/40 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-navy/60 mb-2">No products found</h3>
            <p className="text-navy/50 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gold text-white rounded-lg hover:bg-orange transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(searchState.currentPage - 1)}
              disabled={searchState.currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                searchState.currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gold/20 text-navy hover:bg-gold hover:text-white'
              }`}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else {
                const start = Math.max(1, searchState.currentPage - 2);
                const end = Math.min(totalPages, start + 4);
                pageNumber = start + index;
                if (pageNumber > end) return null;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                    searchState.currentPage === pageNumber
                      ? 'bg-gold text-white'
                      : 'bg-white border border-gold/20 text-navy hover:bg-gold hover:text-white'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(searchState.currentPage + 1)}
              disabled={searchState.currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                searchState.currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gold/20 text-navy hover:bg-gold hover:text-white'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default ItemsSection;