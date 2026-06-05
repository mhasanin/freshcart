import axios from "axios";
import { notFound } from "next/navigation";
import ProductDetailsInfo from "../components/productdetails/ProductDetailsInfo";
import { getProductById } from "../server/products.actions";

export default async function ProductDetailsScreen({
  productId,
}: {
  productId: string;
}) {
  try {
    const response = await getProductById({
      id: productId,
    });

    return <ProductDetailsInfo product={response.data} />;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    console.error("[ProductDetailsScreen] unexpected error:", error);
    throw error;
  }
}
