// "use client";

// import { toast } from "react-toastify";
// import { updateProductQuantity } from "../server/cart.actions";

// export async function updateQuantityUtil(productId: string, newCount: number) {
//   try {
//     console.log("[updateQuantityUtil] calling updateProductQuantity", {
//       productId,
//       newCount,
//     });
//     const result = await updateProductQuantity({
//       productId,
//       quantity: newCount,
//     });

//     console.log("[updateQuantityUtil] result", result);
//     if (result?.status === "success" && result.message) {
//       toast.success(result.message);
//     }

//     return result;
//   } catch (error) {
//     toast.error(
//       error instanceof Error
//         ? error.message
//         : "Failed to update product quantity",
//     );
//     throw error;
//   }
// }
