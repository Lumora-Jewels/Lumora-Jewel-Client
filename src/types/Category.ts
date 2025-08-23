export interface Category {
  _id: string;
  name: string;
  parentCategoryId: string | null;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCardProps {
  category: Category;
}

export interface CategorySectionProps {
  className?: string;
}

export type FilterType = "all" | "parent" | "subcategory";

export interface CarouselState {
  currentIndex: number;
  itemsPerView: number;
  maxIndex: number;
}