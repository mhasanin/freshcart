"use server";
import Axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import type { AddProductToCartResponseType } from "../types/cart.typs";

export async function addProductToCart({
  productId,
}: {
  productId: string;
}): Promise<AddProductToCartResponseType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart`,
      method: "POST",
      headers: {
        token,
      },
      data: {
        productId,
      },
    };
    const { data } = await Axios.request<AddProductToCartResponseType>(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getLoggedUserCart(): Promise<AddProductToCartResponseType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart`,
      method: "GET",
      headers: {
        token,
      },
    };
    const { data } = await Axios.request<AddProductToCartResponseType>(options);
    console.log(JSON.stringify(data.data.products, null, 2));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeProductFromCart({
  productId,
}: {
  productId: string;
}): Promise<AddProductToCartResponseType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: "DELETE",
      headers: {
        token,
      },
    };
    const { data } = await Axios.request<AddProductToCartResponseType>(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateProductQuantity({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<AddProductToCartResponseType> {
  console.log({
    productId,
    quantity,
  });
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: "PUT",
      headers: {
        token,
      },
      data: {
        quantity,
      },
    };
    const { data } = await Axios.request<AddProductToCartResponseType>(options);
    return data;
  } catch (error) {
    throw error;
  }
}
