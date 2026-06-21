import Link from "next/link";

export default function CheckoutBreadcrumbs() {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link className="hover:text-emerald-600 transition" href="/">
        Home
      </Link>
      <span className="text-gray-300">/</span>
      <Link className="hover:text-emerald-600 transition" href="/cart">
        Cart
      </Link>
      <span className="text-gray-300">/</span>
      <span className="text-gray-900 font-medium">Checkout</span>
    </nav>
  );
}
