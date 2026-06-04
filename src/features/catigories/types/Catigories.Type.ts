export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesMetadataType {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoriesResponseType {
  results: number;
  metadata: CategoriesMetadataType;
  data: CategoryType[];
}
