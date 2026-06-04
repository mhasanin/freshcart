"use server";

import axios, { AxiosRequestConfig } from "axios";
import { CategoriesResponseType } from "../types/Catigories.Type";

export async function getAllCategories(): Promise<CategoriesResponseType> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/categories`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
