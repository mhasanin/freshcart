import { CategoryType } from "@/features/catigories/types/Catigories.Type";

export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface SubcategoryType {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductType {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  category: CategoryType;
  subcategory: SubcategoryType[];
  brand: BrandType;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponseType {
  results: number;
  data: ProductType[];
}
