import WishlistScreen from "@/features/wishlist/views/wishlist.screen";
import { getLoggedUserWishlist } from "@/features/wishlist/server/wishlist.actions";
import type { GetWishlistResponseType } from "@/features/wishlist/types/wishlist.types";

export default async function Wishlist() {
  let initialWishlist: GetWishlistResponseType | null = null;

  try {
    initialWishlist = await getLoggedUserWishlist();
  } catch (error) {
    console.error("Failed to load wishlist data:", error);
  }

  return (
    <>
      <WishlistScreen initialWishlist={initialWishlist} />
    </>
  );
}
