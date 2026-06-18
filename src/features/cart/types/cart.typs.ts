export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductDetails {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  _id: string;
  product: ProductDetails;
  price: number;
  count: number;
}

export interface CartDataType {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddProductToCartResponseType {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDataType;
}

// export interface UpdateProductQuantityResponseType {
//   status: string;
//   message?: string;
//   numOfCartItems: number;
//   cartId: string;
//   data: CartDataType;
// }
