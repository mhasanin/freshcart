export interface WishlistSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface WishlistCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface WishlistItem {
  sold: number;
  images: string[];
  subcategory: WishlistSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: WishlistCategory;
  brand: WishlistBrand;
  ratingsAverage: number;
  id: string;
}

export interface GetWishlistResponseType {
  status: string;
  count: number;
  data: WishlistItem[];
}

export interface MutateWishlistResponseType {
  status: string;
  message: string;
  data: string[];
}
