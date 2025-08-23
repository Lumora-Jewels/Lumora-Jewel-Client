export interface ProductVariant {
  _id?: string;
  color?: string;
  size?: string;
  material?: string;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  SKU?: string;
  price: number;
  discount?: number;
  stock: number;
  variants: ProductVariant[];
  categoryId: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCardProps {
  product: Product;
}

export interface ItemsPageProps {
  categoryId?: string;
}

export interface ItemsSectionProps {
  categoryId: string;
  className?: string;
}

export type ProductSortType = "name" | "price-low" | "price-high" | "newest" | "oldest";

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
}

export interface ProductSearchState {
  searchTerm: string;
  sortBy: ProductSortType;
  filters: ProductFilters;
  currentPage: number;
  itemsPerPage: number;
}