import { getUserOrders } from "../server/orders.actions";
import OrderCard from "../components/OrderCard";
import { Order } from "../types/orders.types";
import {  ArrowDown,  Package,  ShoppingBag } from 'lucide-react';

export default async function OrdersScreen() {
  const response: Order[] = await getUserOrders();

  if (!response || response.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-slate-50 rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden">
        
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center bg-white rounded-full shadow-inner border border-gray-50">
          <ShoppingBag className="w-10 h-10 text-slate-400 stroke-[1.5]" />
          
          <div className="absolute -top-1 -right-1 text-emerald-500 animate-bounce">
            <ArrowDown className="w-5 h-5 stroke-[3]" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-slate-800">My Orders</h1>
        <p className="text-gray-500 mb-6 text-sm max-w-sm">You have no orders yet.</p>

       
        
        <div className="absolute bottom-3 right-4 opacity-20 text-emerald-600 pointer-events-none text-xl select-none">
          ✦ ✧
        </div>
      </div>
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
              <Package className="w-6 h-6 text-white" />
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
         <ShoppingBag className="w-4 h-4" />
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
