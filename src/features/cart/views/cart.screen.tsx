"use client";

import React from "react";
import EmptyCart from "../components/emptyCart";
import CartItemsList from "../components/CartItemsList";
import { useAppSelector } from "@/store/hooks";

export default function CartScreen() {
  const { products } = useAppSelector((state) => state.cart);

  const isCartEmpty = !products || products.length === 0;

  return <>{isCartEmpty ? <EmptyCart /> : <CartItemsList />}</>;
}
