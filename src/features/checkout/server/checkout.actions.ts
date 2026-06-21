"use server";

import Axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { shippingAddressType } from "../schemas/checkout.schema";

export async function createCashOrder({
  cartId,
  shippingAddress,
}: {
  cartId: string;
  shippingAddress: shippingAddressType;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      method: "POST",
      headers: {
        token,
      },
      data: shippingAddress,
    };
    const { data } = await Axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function createOnlineOrder({
  cartId,
  shippingAddress,
  originUrl,
}: {
  cartId: string;
  shippingAddress: shippingAddressType;
  originUrl: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${originUrl}`,
      method: "POST",
      headers: {
        token,
      },
      data: shippingAddress,
    };
    const { data } = await Axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
