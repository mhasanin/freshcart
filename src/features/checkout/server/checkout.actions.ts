"use server";

import { cookies } from "next/headers";

type shippingAdress = {
  details: string;
  phone: string;
  city: string;
};
export async function createCashOrder({
  cartId,
  shippingAdress,
}: {
  cartId: string;
  shippingAdress: shippingAdress;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
}
