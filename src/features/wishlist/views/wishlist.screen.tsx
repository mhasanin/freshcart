"use client";

import React, { useEffect } from "react";
import EmptyWishlist from "@/features/wishlist/components/emptyWishlist";
import WishlistItemsList from "@/features/wishlist/components/WishlistItemsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setWishlistInfo } from "../store/wishlist.slice";
import type { GetWishlistResponseType } from "../types/wishlist.types";

interface WishlistScreenProps {
  initialWishlist: GetWishlistResponseType | null;
}

export default function WishlistScreen({
  initialWishlist,
}: WishlistScreenProps) {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    if (initialWishlist) {
      dispatch(setWishlistInfo(initialWishlist));
    }
  }, [dispatch, initialWishlist]);

  const isWishlistEmpty = !products || products.length === 0;

  return <>{isWishlistEmpty ? <EmptyWishlist /> : <WishlistItemsList />}</>;
}
