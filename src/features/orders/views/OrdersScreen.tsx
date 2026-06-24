import { getUserOrders } from "../server/orders.actions";
import OrderCard from "../components/OrderCard";
import { Order } from "../types/orders.types";

export default async function OrdersScreen() {
  const response: Order[] = await getUserOrders();

  if (!response || response.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a className="hover:text-primary-600 transition" href="/">
            Home
          </a>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {response.length} orders
              </p>
            </div>
          </div>
          <a
            className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm"
            href="/"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Continue Shopping
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {response.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
