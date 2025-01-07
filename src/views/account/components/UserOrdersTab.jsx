import { OrderList } from '@/components/order';
import React from 'react';
import {
   useOrderList
} from '@/hooks';
import { MessageDisplay } from '@/components/common';
// Just add this feature if you want :P

const UserOrdersTab = () => {
  const {
    orders,
    fetchOrderList,
    isLoading: isLoadingOrder,
    error: errorFeatured
  } = useOrderList(6);

  return (
    <div className="order-loader">
      <h3>My Orders</h3>
      <div className="order-display">
        {errorFeatured && !isLoadingOrder ? (
          <div className="order-error-message">
            <p>{errorFeatured}</p>
            <button onClick={fetchOrderList}>Try Again</button>
          </div>
        ) : isLoadingOrder ? (
          <OrderList orders={[]} skeletonCount={6} />
        ) : orders.length > 0 ? (
          <OrderList orders={orders} skeletonCount={6} />
        ) : (
          <strong>
            <span className="text-subtle">You don&apos;t have any orders</span>
          </strong>
        )}
      </div>
    </div>
  );
};

export default UserOrdersTab;
