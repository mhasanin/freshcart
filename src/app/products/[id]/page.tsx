import ProductDetailsScreen from "@/features/products/views/productDetails.screen";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return <ProductDetailsScreen productId={id} />;
}
