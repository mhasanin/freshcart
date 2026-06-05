"use server";

import axios, { AxiosRequestConfig } from "axios";
import {
  ProductsResponseType,
  SingleProductResponseType,
} from "../types/products.types";

export async function getProducts(): Promise<ProductsResponseType> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById({
  id,
}: {
  id: string;
}): Promise<SingleProductResponseType> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
