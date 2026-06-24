"use server";

import axios, { AxiosRequestConfig } from "axios";
import { varifyToken } from "@/features/auth/server/auth.actions";

export async function getUserOrders() {
  const authState = await varifyToken();

  if (!authState.isAuthenticated || !authState.userInfo?.id) {
    throw new Error("User is not authenticated or invalid token");
  }

  const userId = authState.userInfo.id;

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      method: "GET",
    };

    const { data } = await axios.request(options);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
