"use server";

import Axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import type {
  GetWishlistResponseType,
  MutateWishlistResponseType,
} from "../types/wishlist.types";

export async function addProductToWishlist({
  productId,
}: {
  productId: string;
}): Promise<MutateWishlistResponseType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId,
      },
    };
    const { data } = await Axios.request<MutateWishlistResponseType>(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLoggedUserWishlist(): Promise<GetWishlistResponseType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await Axios.request<GetWishlistResponseType>(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromWishlist({
  productId,
}: {
  productId: string;
}): Promise<MutateWishlistResponseType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    const { data } = await Axios.request<MutateWishlistResponseType>(options);
    return data;
  } catch (error) {
    throw error;
  }
}
